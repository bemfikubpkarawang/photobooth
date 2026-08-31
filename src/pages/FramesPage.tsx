import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, Camera, X, ChevronRight } from 'lucide-react';
import { FRAMES, CATEGORY_LABELS, CATEGORY_COLORS, getFrameImageUrl } from '../data/frames';
import type { FrameData } from '../data/frames';
import { useApp } from '../context/AppContext';

const CATEGORIES = ['all', 'aesthetic', 'cute', 'fik', 'fun', 'retro', 'y2k'];

interface FrameCardProps {
  frame: FrameData;
  isFav: boolean;
  onFav: () => void;
  onPreview: () => void;
  onSelect: () => void;
}

function FrameCard({ frame, isFav, onFav, onPreview, onSelect }: FrameCardProps) {
  const colors = CATEGORY_COLORS[frame.category];
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden group transition-all hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
      style={{ background: '#FFFFFF', boxShadow: '0 2px 16px rgba(26,27,60,0.06)', border: '1px solid rgba(108,99,255,0.08)' }}
    >
      {/* Frame thumbnail */}
      <div
        className="relative overflow-hidden"
        style={{ background: colors.bg, aspectRatio: String(frame.aspectRatio) }}
        onClick={onPreview}
      >
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: colors.border }}
            >
              <Camera size={20} style={{ color: colors.text }} />
            </div>
            <span className="text-xs font-semibold text-center" style={{ color: colors.text }}>{frame.displayName}</span>
          </div>
        ) : (
          <img
            src={getFrameImageUrl(frame)}
            alt={frame.displayName}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: 'rgba(26,27,60,0.3)' }}
        >
          <div className="flex gap-2">
            <button
              onClick={e => { e.stopPropagation(); onPreview(); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white"
              style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}
            >
              <Eye size={13} /> Preview
            </button>
          </div>
        </div>

        {/* Fav button */}
        <button
          onClick={e => { e.stopPropagation(); onFav(); }}
          className="absolute top-2 right-2 w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110"
          style={{ background: isFav ? '#D946EF' : 'rgba(255,255,255,0.9)', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
        >
          <Heart size={14} fill={isFav ? '#fff' : 'none'} style={{ color: isFav ? '#fff' : '#D946EF' }} />
        </button>
      </div>

      {/* Card footer */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-sm font-semibold truncate" style={{ color: '#1A1B3C' }}>{frame.displayName}</p>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ml-1"
            style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
          >
            {frame.categoryLabel}
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: '#6B7280' }}>{frame.slots.length} photo{frame.slots.length > 1 ? 's' : ''}</p>
        <div className="flex gap-2">
          <button
            onClick={onPreview}
            className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all hover:shadow-sm"
            style={{ background: 'rgba(108,99,255,0.08)', color: '#6C63FF', border: '1px solid rgba(108,99,255,0.15)' }}
          >
            Preview
          </button>
          <button
            onClick={onSelect}
            className="flex-1 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)' }}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}

interface PreviewModalProps {
  frame: FrameData;
  onClose: () => void;
  onUse: () => void;
}

function PreviewModal({ frame, onClose, onUse }: PreviewModalProps) {
  const colors = CATEGORY_COLORS[frame.category];
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(26,27,60,0.6)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-lg max-h-[92vh] flex flex-col rounded-3xl overflow-hidden"
        style={{ background: '#FFFFFF', boxShadow: '0 24px 80px rgba(26,27,60,0.25)' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
          style={{ background: 'rgba(26,27,60,0.08)' }}
        >
          <X size={16} style={{ color: '#1A1B3C' }} />
        </button>

        {/* Frame preview */}
        <div
          className="flex-shrink-0 flex items-center justify-center p-6"
          style={{ background: colors.bg, maxHeight: '60vh' }}
        >
          {imgError ? (
            <div
              className="w-40 rounded-2xl flex flex-col items-center justify-center gap-3 p-8"
              style={{ background: colors.border, aspectRatio: String(frame.aspectRatio) }}
            >
              <Camera size={28} style={{ color: colors.text }} />
              <span className="text-xs font-semibold text-center" style={{ color: colors.text }}>{frame.displayName}</span>
            </div>
          ) : (
            <img
              src={getFrameImageUrl(frame)}
              alt={frame.displayName}
              className="max-h-[50vh] max-w-full object-contain rounded-xl shadow-2xl"
              style={{ width: 'auto' }}
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Info + actions */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-xl font-bold" style={{ color: '#1A1B3C' }}>{frame.displayName}</h2>
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
            >
              {frame.categoryLabel}
            </span>
          </div>
          <p className="text-sm mb-5" style={{ color: '#6B7280' }}>
            {frame.slots.length} photo slot{frame.slots.length > 1 ? 's' : ''} · {frame.ext.toUpperCase()} overlay
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
              style={{ background: 'rgba(108,99,255,0.08)', color: '#6C63FF', border: '1px solid rgba(108,99,255,0.15)' }}
            >
              Close
            </button>
            <button
              onClick={onUse}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)' }}
            >
              <Camera size={15} />
              Use This Frame
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FramesPage() {
  const navigate = useNavigate();
  const { selectFrame } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [previewFrame, setPreviewFrame] = useState<FrameData | null>(null);

  const filtered = activeCategory === 'all'
    ? FRAMES
    : FRAMES.filter(f => f.category === activeCategory);

  const toggleFav = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleUseFrame = (frame: FrameData) => {
    selectFrame(frame);
    navigate('/photobooth');
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 page-enter" style={{ background: '#F8F7FF' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3" style={{ color: '#1A1B3C' }}>
            Pick Your Frame.
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: '#6B7280' }}>
            Find a frame that matches your vibe, preview it, then use it for your photobooth.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: activeCategory === cat
                  ? 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)'
                  : '#FFFFFF',
                color: activeCategory === cat ? '#FFFFFF' : '#1A1B3C',
                boxShadow: activeCategory === cat
                  ? '0 4px 12px rgba(108,99,255,0.3)'
                  : '0 2px 8px rgba(26,27,60,0.06)',
                border: activeCategory === cat ? 'none' : '1px solid rgba(108,99,255,0.1)',
              }}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
          {filtered.length} frame{filtered.length !== 1 ? 's' : ''} {activeCategory !== 'all' ? `in ${CATEGORY_LABELS[activeCategory]}` : 'total'}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-5">
          {filtered.map(frame => (
            <FrameCard
              key={frame.id}
              frame={frame}
              isFav={favorites.has(frame.id)}
              onFav={() => toggleFav(frame.id)}
              onPreview={() => setPreviewFrame(frame)}
              onSelect={() => handleUseFrame(frame)}
            />
          ))}
        </div>
      </div>

      {/* Preview modal */}
      {previewFrame && (
        <PreviewModal
          frame={previewFrame}
          onClose={() => setPreviewFrame(null)}
          onUse={() => { handleUseFrame(previewFrame); setPreviewFrame(null); }}
        />
      )}
    </div>
  );
}
