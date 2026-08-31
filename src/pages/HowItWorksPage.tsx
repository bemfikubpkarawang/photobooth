import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Layers, Zap, Sliders, Download, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    icon: <Layers size={28} />,
    title: 'Choose Your Frame',
    desc: 'Browse 27 unique frames across 6 categories — Aesthetic, Cute, FIK, Fun, Retro, and Y2K. Preview any frame before selecting it.',
    color: '#6C63FF',
  },
  {
    n: '02',
    icon: <Camera size={28} />,
    title: 'Allow Camera',
    desc: 'Click "Enable Camera" to activate your camera. Your camera will only turn on when you choose to — never automatically.',
    color: '#8B5CF6',
  },
  {
    n: '03',
    icon: <Zap size={28} />,
    title: 'Take Your Photos',
    desc: 'A countdown starts after you press capture. Each photo fills the corresponding slot in your selected frame, one by one.',
    color: '#A855F7',
  },
  {
    n: '04',
    icon: <Sliders size={28} />,
    title: 'Customize Effects',
    desc: 'Apply live effects — Brighten, Warm, Cool, Contrast, Beauty, and more. Effects apply to your photos without touching the frame.',
    color: '#D946EF',
  },
  {
    n: '05',
    icon: <Download size={28} />,
    title: 'Get Your Photo',
    desc: 'Preview your completed photobooth composition, then download the finished image or scan the QR code to get it on your phone.',
    color: '#EC4899',
  },
];

export default function HowItWorksPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 page-enter" style={{ background: '#F8F7FF' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
            style={{ background: 'rgba(108,99,255,0.1)', color: '#6C63FF', border: '1px solid rgba(108,99,255,0.2)' }}
          >
            How It Works
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: '#1A1B3C' }}>
            Simple. Fun. Memorable.
          </h1>
          <p className="text-base" style={{ color: '#6B7280' }}>
            From frame selection to your finished photobooth print — in under a minute.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className="flex gap-5 p-6 rounded-2xl items-start transition-all hover:shadow-md"
              style={{ background: '#FFFFFF', boxShadow: '0 2px 16px rgba(26,27,60,0.06)', border: '1px solid rgba(108,99,255,0.08)' }}
            >
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${step.color}CC 0%, ${step.color} 100%)` }}
                >
                  {step.icon}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-0.5 h-8 rounded-full" style={{ background: `${step.color}30` }} />
                )}
              </div>
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold tracking-widest" style={{ color: step.color }}>STEP {step.n}</span>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#1A1B3C' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/frames')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all hover:scale-105 hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)', boxShadow: '0 8px 30px rgba(108,99,255,0.35)' }}
          >
            <Camera size={18} />
            Try It Now
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
