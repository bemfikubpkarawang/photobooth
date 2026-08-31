import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Camera, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Frames', path: '/frames' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'About', path: '/about' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const go = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const isPhotobooth = location.pathname.startsWith('/photobooth');

  if (isPhotobooth) return null;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(248,247,255,0.95)' : 'rgba(248,247,255,0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(108,99,255,0.12)' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(108,99,255,0.08)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <button
              onClick={() => go('/')}
              className="flex items-center gap-2.5 group"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)' }}
              >
                <Camera size={16} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-base tracking-tight" style={{ color: '#1A1B3C' }}>
                  FIK Photobooth
                </span>
                <span className="text-xs font-medium" style={{ color: '#6B7280' }}>
                  PKKMB FIK
                </span>
              </div>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <button
                  key={link.path}
                  onClick={() => go(link.path)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive(link.path) ? '#6C63FF' : '#1A1B3C',
                    background: isActive(link.path) ? 'rgba(108,99,255,0.08)' : 'transparent',
                  }}
                  onMouseEnter={e => {
                    if (!isActive(link.path)) (e.currentTarget as HTMLElement).style.background = 'rgba(108,99,255,0.05)';
                  }}
                  onMouseLeave={e => {
                    if (!isActive(link.path)) (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => go('/frames')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)', boxShadow: '0 4px 15px rgba(108,99,255,0.3)' }}
              >
                <Sparkles size={14} />
                Start Photobooth
              </button>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: menuOpen ? 'rgba(108,99,255,0.1)' : 'transparent' }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} style={{ color: '#6C63FF' }} /> : <Menu size={20} style={{ color: '#1A1B3C' }} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40 md:hidden"
          onClick={e => { if (e.target === overlayRef.current) setMenuOpen(false); }}
        >
          <div className="absolute inset-0" style={{ background: 'rgba(26,27,60,0.4)', backdropFilter: 'blur(4px)' }} />
          <div
            className="absolute top-16 left-0 right-0 p-4 shadow-2xl"
            style={{ background: 'rgba(248,247,255,0.98)', borderBottom: '1px solid rgba(108,99,255,0.12)' }}
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <button
                  key={link.path}
                  onClick={() => go(link.path)}
                  className="text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    color: isActive(link.path) ? '#6C63FF' : '#1A1B3C',
                    background: isActive(link.path) ? 'rgba(108,99,255,0.08)' : 'transparent',
                    fontWeight: isActive(link.path) ? 600 : 500,
                  }}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 pb-1">
                <button
                  onClick={() => go('/frames')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)' }}
                >
                  <Sparkles size={14} />
                  Start Photobooth
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
