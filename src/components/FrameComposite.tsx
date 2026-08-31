import React from 'react';
import type { FrameData, FrameSlot } from '../data/frames';

interface Props {
  frame: FrameData;
  photos: string[];
  currentSlot?: number;
  className?: string;
}

interface SlotGeometry {
  left: number;
  top: number;
  width: number;
  height: number;
  clipPath: string;
}

function getSlotGeometry(
  slot: FrameSlot,
  frameWidth: number,
  frameHeight: number
): SlotGeometry {
  const points = slot.points;

  if (points.length < 3) {
    return {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    };
  }

  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const width = maxX - minX;
  const height = maxY - minY;

  const left = (minX / frameWidth) * 100;
  const top = (minY / frameHeight) * 100;

  const widthPercent = (width / frameWidth) * 100;
  const heightPercent = (height / frameHeight) * 100;

  const clipPoints = points.map(([x, y]) => {
    const localX =
      width === 0 ? 0 : ((x - minX) / width) * 100;

    const localY =
      height === 0 ? 0 : ((y - minY) / height) * 100;

    return `${localX}% ${localY}%`;
  });

  return {
    left,
    top,
    width: widthPercent,
    height: heightPercent,
    clipPath: `polygon(${clipPoints.join(', ')})`,
  };
}

export default function FrameComposite({
  frame,
  photos,
  currentSlot,
  className = '',
}: Props) {
  return (
    <div
      className={`relative overflow-hidden select-none ${className}`}
      style={{
        aspectRatio: String(frame.aspectRatio),
      }}
    >
      {/* 
       * PHOTO LAYERS
       *
       * Foto berada di belakang template transparent.
       * Setiap foto hanya boleh muncul di dalam
       * polygon slot miliknya sendiri.
       */}
      {frame.slots.map((slot, i) => {
        const photo = photos[i];
        const isCurrentEmpty =
          !photo && i === currentSlot;
        const isFilled = Boolean(photo);

        const geometry = getSlotGeometry(
          slot,
          frame.width,
          frame.height
        );

        return (
          <div
            key={slot.id}
            className="absolute overflow-hidden"
            style={{
              top: `${geometry.top}%`,
              left: `${geometry.left}%`,
              width: `${geometry.width}%`,
              height: `${geometry.height}%`,
              clipPath: geometry.clipPath,
              WebkitClipPath: geometry.clipPath,
              zIndex: 1,
            }}
          >
            {isFilled ? (
              <img
                src={photo}
                alt={`Photo ${i + 1}`}
                className="w-full h-full object-cover slot-fill-in"
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-xs font-semibold"
                style={{
                  background: isCurrentEmpty
                    ? 'rgba(108,99,255,0.15)'
                    : 'rgba(255,255,255,0.08)',
                  border: isCurrentEmpty
                    ? '2px dashed rgba(108,99,255,0.5)'
                    : '2px dashed rgba(255,255,255,0.2)',
                  color: isCurrentEmpty
                    ? 'rgba(108,99,255,0.8)'
                    : 'rgba(255,255,255,0.3)',
                  boxSizing: 'border-box',
                }}
              >
                {isCurrentEmpty ? `${i + 1}` : ''}
              </div>
            )}
          </div>
        );
      })}

      {/* 
       * TEMPLATE TRANSPARENT
       *
       * Ini BUKAN frame baru.
       * Ini adalah hasil template yang dibuat dari
       * artwork frame asli.
       *
       * Area slot transparan sehingga foto di bawahnya
       * tetap terlihat.
       */}
      {frame.templateTransparentUrl ? (
        <img
          src={frame.templateTransparentUrl}
          alt=""
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            zIndex: 2,
            objectFit: 'fill',
          }}
          draggable={false}
        />
      ) : null}
    </div>
  );
}