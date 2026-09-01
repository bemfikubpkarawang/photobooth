import React from 'react';
import {
  Sparkles,
  Heart,
  Monitor,
  Star,
  Disc3,
  Headphones,
} from 'lucide-react';

const GALLERY_ITEMS = [
  {
    image: 'gallery-samples/aesthetic.jpg',
    label: 'Aesthetic',
    icon: Sparkles,
  },
  {
    image: 'gallery-samples/cute.jpg',
    label: 'Cute',
    icon: Heart,
  },
  {
    image: 'gallery-samples/fik.jpg',
    label: 'FIK',
    icon: Monitor,
  },
  {
    image: 'gallery-samples/fun.jpg',
    label: 'Fun',
    icon: Star,
  },
  {
    image: 'gallery-samples/y2k.jpg',
    label: 'Y2K',
    icon: Disc3,
  },
  {
    image: 'gallery-samples/retro.jpg',
    label: 'Retro',
    icon: Headphones,
  },
];

export default function GalleryPage() {
  return (
    <div
      className="min-h-screen pt-24 pb-20 px-4 page-enter"
      style={{ background: '#F8F7FF' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
            style={{
              background: 'rgba(108, 99, 255, 0.1)',
              color: '#6C63FF',
              border: '1px solid rgba(108, 99, 255, 0.2)',
            }}
          >
            <Sparkles size={14} />
            Gallery
          </div>

          <h1
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ color: '#1A1B3C' }}
          >
            PKKMB Moments
          </h1>

          <p
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: '#6B7280' }}
          >
            Explore sample results from our photobooth frames and
            find the perfect style for your moment.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {GALLERY_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1"
                style={{
                  boxShadow: '0 4px 20px rgba(26, 27, 60, 0.08)',
                  border: '1px solid rgba(108, 99, 255, 0.08)',
                }}
              >
                {/* Sample Image */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: '1 / 1',
                    background: '#F1F0F7',
                  }}
                >
                  <img
                    src={item.image}
                    alt={`Sample hasil frame ${item.label}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>

                {/* Card Label */}
                <div className="px-5 py-4">
                  <div
                    className="flex items-center justify-center gap-2 text-base md:text-lg font-bold"
                    style={{ color: '#6C63FF' }}
                  >
                    <span>{item.label}</span>
                    <Icon size={17} strokeWidth={2} />
                  </div>

                  <p
                    className="text-xs text-center mt-1"
                    style={{ color: '#9CA3AF' }}
                  >
                    Sample frame
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div
          className="mt-8 md:mt-10 rounded-2xl px-5 py-5 md:px-7 md:py-6"
          style={{
            background: 'rgba(108, 99, 255, 0.06)',
            border: '1px solid rgba(108, 99, 255, 0.12)',
          }}
        >
          <div className="flex items-center justify-center gap-3 text-center">
            <Sparkles
              size={20}
              style={{
                color: '#6C63FF',
                flexShrink: 0,
              }}
            />

            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: '#4F46A5' }}
              >
                Semua foto di atas hanya contoh hasil dari frame.
              </p>

              <p
                className="text-sm mt-1"
                style={{ color: '#6B7280' }}
              >
                Hasil fotomu akan terlihat sesuai kreativitasmu!
              </p>
            </div>

            <Heart
              size={20}
              style={{
                color: '#A855F7',
                flexShrink: 0,
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}