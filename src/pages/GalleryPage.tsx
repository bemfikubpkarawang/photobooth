import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Image } from 'lucide-react';

// Placeholder gallery items using gradient cards to simulate photobooth results
const GALLERY_ITEMS = [
  { color: '#6C63FF', label: 'Aesthetic Session', sub: 'aesthetic3 frame' },
  { color: '#EC4899', label: 'Cute Vibes', sub: 'cute4 frame' },
  { color: '#1E40AF', label: 'FIK Moment', sub: 'fik2 frame' },
  { color: '#059669', label: 'Y2K Energy', sub: 'y2k3 frame' },
  { color: '#7C3AED', label: 'Retro Feel', sub: 'retro2 frame' },
  { color: '#D97706', label: 'Fun Day', sub: 'fun3 frame' },
  { color: '#DB2777', label: 'Aesthetic 2', sub: 'aesthetic1 frame' },
  { color: '#2563EB', label: 'FIK Pride', sub: 'fik5 frame' },
  { color: '#7C3AED', label: 'Y2K Glam', sub: 'y2k1 frame' },
];

export default function GalleryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 page-enter" style={{ background: '#F8F7FF' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
            style={{ background: 'rgba(108,99,255,0.1)', color: '#6C63FF', border: '1px solid rgba(108,99,255,0.2)' }}
          >
            Gallery
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: '#1A1B3C' }}>
            PKKMB Moments
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: '#6B7280' }}>
            Real photobooth results from your sessions will appear here. Create yours and it will be featured.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group transition-all hover:scale-102 hover:shadow-xl"
              style={{ boxShadow: '0 2px 16px rgba(26,27,60,0.08)' }}
              onClick={() => navigate('/frames')}
            >
              {/* Placeholder photobooth result */}
              <div
                className="w-full flex flex-col items-center justify-center p-6 text-white"
                style={{
                  background: `linear-gradient(160deg, ${item.color}CC 0%, ${item.color} 100%)`,
                  aspectRatio: i % 3 === 0 ? '0.5' : i % 3 === 1 ? '0.65' : '0.55',
                  minHeight: 160,
                }}
              >
                <Image size={28} style={{ opacity: 0.6, marginBottom: 8 }} />
                <span className="text-xs font-semibold text-white/70 text-center">{item.label}</span>
                <span className="text-xs text-white/50 mt-1">{item.sub}</span>
              </div>
              <div
                className="p-3 flex items-center justify-between"
                style={{ background: '#FFFFFF' }}
              >
                <div>
                  <p className="text-xs font-semibold" style={{ color: '#1A1B3C' }}>{item.label}</p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>{item.sub}</p>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: `${item.color}15`, color: item.color }}
                >
                  Sample
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <div
            className="inline-block rounded-2xl p-8 max-w-md"
            style={{ background: '#FFFFFF', boxShadow: '0 2px 16px rgba(26,27,60,0.06)', border: '1px solid rgba(108,99,255,0.08)' }}
          >
            <p className="text-sm font-medium mb-4" style={{ color: '#6B7280' }}>
              Your photobooth results appear here after your session.
            </p>
            <button
              onClick={() => navigate('/frames')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)' }}
            >
              <Camera size={15} />
              Create Your First
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
