import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ArrowRight } from 'lucide-react';
import { FRAMES, type FrameData } from '../data/frames';

// Ambil semua template preview yang tersedia.
// Struktur:
// src/templates/frame_templates/[category]/[frame]/template_preview.png
const previewModules = import.meta.glob(
  '../templates/frame_templates/*/*/template_preview.png',
  {
    eager: true,
    import: 'default',
    query: '?url',
  }
) as Record<string, string>;

function getPreviewUrl(frame: FrameData): string {
  const expectedSuffix =
    `/${frame.category}/${frame.name}/template_preview.png`;

  const entry = Object.entries(previewModules).find(([path]) =>
    path.endsWith(expectedSuffix)
  );

  return entry?.[1] ?? '';
}

function getFrameLabel(frame: FrameData): string {
  return `${frame.categoryLabel} ${frame.name.match(/\d+$/)?.[0] ?? ''}`.trim();
}

export default function GalleryPage() {
  const navigate = useNavigate();

  const handleTryFrame = (frame: FrameData) => {
    navigate('/frames');
  };

  return (
    <div
      className="min-h-screen pt-24 pb-20 px-4 page-enter"
      style={{ background: '#F8F7FF' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
            style={{
              background: 'rgba(108,99,255,0.1)',
              color: '#6C63FF',
              border: '1px solid rgba(108,99,255,0.2)',
            }}
          >
            Gallery
          </div>

          <h1
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ color: '#1A1B3C' }}
          >
            PKKMB Moments
          </h1>

          <p
            className="text-base max-w-md mx-auto"
            style={{ color: '#6B7280' }}
          >
            Explore sample results from our photobooth frames and
            find the perfect style for your moment.
          </p>
        </div>

        {/* Gallery */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {FRAMES.map((frame) => {
            const previewUrl = getPreviewUrl(frame);

            return (
              <div
                key={frame.id}
                className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group transition-all hover:scale-[1.02] hover:shadow-xl"
                style={{
                  boxShadow: '0 2px 16px rgba(26,27,60,0.08)',
                }}
              >

                {/* Template Preview */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    background: '#FFFFFF',
                    aspectRatio: String(frame.aspectRatio),
                  }}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={`Sample ${getFrameLabel(frame)}`}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background: 'rgba(108,99,255,0.05)',
                        color: '#9CA3AF',
                      }}
                    >
                      <span className="text-xs">
                        Preview unavailable
                      </span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(26,27,60,0.7), transparent 55%)',
                    }}
                  >
                    <div className="w-full p-4">
                      <p className="text-sm font-bold text-white">
                        {getFrameLabel(frame)}
                      </p>

                      <p className="text-xs text-white/70 mt-1">
                        {frame.slots.length} photo slot
                        {frame.slots.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card info */}
                <div
                  className="p-3 flex items-center justify-between"
                  style={{ background: '#FFFFFF' }}
                >
                  <div>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: '#1A1B3C' }}
                    >
                      {getFrameLabel(frame)}
                    </p>

                    <p
                      className="text-xs"
                      style={{ color: '#6B7280' }}
                    >
                      {frame.categoryLabel}
                    </p>
                  </div>

                  <button
                    onClick={() => handleTryFrame(frame)}
                    className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg font-semibold transition-all hover:scale-105"
                    style={{
                      background: 'rgba(108,99,255,0.1)',
                      color: '#6C63FF',
                    }}
                  >
                    Try
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <div
            className="inline-block rounded-2xl p-8 max-w-md"
            style={{
              background: '#FFFFFF',
              boxShadow: '0 2px 16px rgba(26,27,60,0.06)',
              border: '1px solid rgba(108,99,255,0.08)',
            }}
          >
            <p
              className="text-sm font-medium mb-4"
              style={{ color: '#6B7280' }}
            >
              Found a frame you like? Create your own photobooth
              moment now.
            </p>

            <button
              onClick={() => navigate('/frames')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
              style={{
                background:
                  'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)',
              }}
            >
              <Camera size={15} />
              Choose Your Frame
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}