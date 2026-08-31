import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Sparkles, Heart, Star, Zap, Download, ArrowRight, CheckCircle } from 'lucide-react';
import { FRAMES, CATEGORY_COLORS, getFrameImageUrl } from '../data/frames';

const FEATURED_FRAMES = ['aesthetic3', 'cute4', 'fik2', 'retro2', 'y2k1', 'fun3'];
const featured = FRAMES.filter(f => FEATURED_FRAMES.includes(f.id));

const WHY_ITEMS = [
  { icon: <Sparkles size={22} />, title: 'Premium Frames', desc: 'Choose from 27 unique frames across 6 aesthetic categories.' },
  { icon: <Camera size={22} />, title: 'Live Camera', desc: 'Real-time camera preview with effects and flip controls.' },
  { icon: <Zap size={22} />, title: 'Instant Result', desc: 'Get your composited photobooth print in seconds.' },
  { icon: <Download size={22} />, title: 'Download & Share', desc: 'Save your moment as a high-quality image.' },
];

const HOW_STEPS = [
  { n: '01', label: 'Choose a Frame' },
  { n: '02', label: 'Enable Camera' },
  { n: '03', label: 'Take Photos' },
  { n: '04', label: 'Apply Effects' },
  { n: '05', label: 'Download' },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen page-enter" style={{ background: '#F8F7FF' }}>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* bg blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: '#6C63FF' }} />
        <div className="absolute top-40 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: '#D946EF' }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            style={{ background: 'rgba(108,99,255,0.1)', color: '#6C63FF', border: '1px solid rgba(108,99,255,0.2)' }}
          >
            <Star size={13} fill="currentColor" />
            PKKMB Fakultas Ilmu Komputer
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-none" style={{ color: '#1A1B3C' }}>
            FIK<br />
            <span style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Photobooth
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-semibold mb-3" style={{ color: '#1A1B3C' }}>
            Capture Your PKKMB Moments.
          </p>
          <p className="text-base md:text-lg mb-10 max-w-xl mx-auto" style={{ color: '#6B7280' }}>
            Choose a frame, take your photos, and create your own photobooth memory.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/frames')}
              className="flex items-center gap-2 px-7 py-4 rounded-2xl text-base font-bold text-white transition-all hover:scale-105 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)', boxShadow: '0 8px 30px rgba(108,99,255,0.35)' }}
            >
              <Camera size={18} />
              Start Photobooth
            </button>
            <button
              onClick={() => navigate('/frames')}
              className="flex items-center gap-2 px-7 py-4 rounded-2xl text-base font-bold transition-all hover:scale-105"
              style={{ background: '#FFFFFF', color: '#1A1B3C', boxShadow: '0 4px 20px rgba(26,27,60,0.08)', border: '1px solid rgba(108,99,255,0.15)' }}
            >
              Explore Frames
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Frames Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1A1B3C' }}>Featured Frames</h2>
            <p className="text-base" style={{ color: '#6B7280' }}>A glimpse of the frames waiting for you.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featured.map(frame => {
              const colors = CATEGORY_COLORS[frame.category];
              return (
                <div
                  key={frame.id}
                  onClick={() => navigate('/frames')}
                  className="group cursor-pointer rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-xl"
                  style={{ background: '#FFFFFF', boxShadow: '0 2px 12px rgba(26,27,60,0.06)', border: '1px solid rgba(108,99,255,0.08)' }}
                >
                  <div
                    className="relative flex items-center justify-center"
                    style={{ background: colors.bg, aspectRatio: String(frame.aspectRatio) }}
                  >
                    <img
                      src={getFrameImageUrl(frame)}
                      alt={frame.displayName}
                      className="w-full h-full object-contain"
                      onError={e => {
                        const el = e.currentTarget;
                        el.style.display = 'none';
                        const parent = el.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div style="color:${colors.text};font-size:11px;font-weight:600;padding:12px;text-align:center;">${frame.displayName}</div>`;
                        }
                      }}
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-semibold truncate" style={{ color: '#1A1B3C' }}>{frame.displayName}</p>
                    <span
                      className="text-xs font-medium px-1.5 py-0.5 rounded-full"
                      style={{ background: colors.bg, color: colors.text }}
                    >
                      {frame.categoryLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/frames')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{ color: '#6C63FF', background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)' }}
            >
              View All 27 Frames <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Why FIK Photobooth */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1A1B3C' }}>Why FIK Photobooth?</h2>
            <p className="text-base" style={{ color: '#6B7280' }}>Everything you need for a premium digital photobooth experience.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_ITEMS.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ background: '#FFFFFF', boxShadow: '0 2px 16px rgba(26,27,60,0.06)', border: '1px solid rgba(108,99,255,0.08)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)' }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold text-base mb-1" style={{ color: '#1A1B3C' }}>{item.title}</p>
                  <p className="text-sm" style={{ color: '#6B7280' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — mini */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1A1B3C' }}>How It Works</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center flex-wrap">
            {HOW_STEPS.map((step, i) => (
              <React.Fragment key={step.n}>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-extrabold text-white"
                    style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)' }}
                  >
                    {step.n}
                  </div>
                  <span className="text-sm font-semibold max-w-24" style={{ color: '#1A1B3C' }}>{step.label}</span>
                </div>
                {i < HOW_STEPS.length - 1 && (
                  <ArrowRight size={18} style={{ color: '#CBD5E1', flexShrink: 0 }} className="hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="rounded-3xl p-10 md:p-14"
            style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)', boxShadow: '0 20px 60px rgba(108,99,255,0.35)' }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready to capture your moment?
            </h2>
            <p className="text-white/80 text-base mb-8">
              Join thousands of students creating memories at PKKMB.
            </p>
            <button
              onClick={() => navigate('/frames')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold bg-white transition-all hover:scale-105 hover:shadow-xl"
              style={{ color: '#6C63FF' }}
            >
              <Camera size={16} />
              Start Photobooth Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t" style={{ borderColor: 'rgba(108,99,255,0.1)', color: '#6B7280' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Heart size={14} style={{ color: '#D946EF' }} />
            <span>FIK Photobooth — PKKMB Fakultas Ilmu Komputer</span>
          </div>
          <span>© 2026 Universitas. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
