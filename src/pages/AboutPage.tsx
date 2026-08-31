import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Heart, Code, Users, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 page-enter" style={{ background: '#F8F7FF' }}>
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-14">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl"
            style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)' }}
          >
            <Camera size={36} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: '#1A1B3C' }}>
            FIK Photobooth
          </h1>
          <p className="text-lg font-semibold mb-2" style={{ color: '#6C63FF' }}>
            Fakultas Ilmu Komputer
          </p>
          <p className="text-base" style={{ color: '#6B7280' }}>
            PKKMB — Pengenalan Kehidupan Kampus bagi Mahasiswa Baru
          </p>
        </div>

        {/* About card */}
        <div
          className="rounded-3xl p-8 mb-6"
          style={{ background: '#FFFFFF', boxShadow: '0 4px 24px rgba(26,27,60,0.06)', border: '1px solid rgba(108,99,255,0.08)' }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1A1B3C' }}>About This Experience</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B7280' }}>
            FIK Photobooth is a digital photobooth web application created for PKKMB (Pengenalan Kehidupan Kampus bagi Mahasiswa Baru) at Fakultas Ilmu Komputer. It's designed to help new students create lasting memories of their first days on campus.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
            Choose from 27 carefully designed frames across 6 aesthetic categories. Take photos with your device camera, apply creative effects, and receive a beautifully composited photobooth print that captures your PKKMB moment.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: <Sparkles size={18} />, value: '27', label: 'Unique Frames' },
            { icon: <Users size={18} />, value: '6', label: 'Categories' },
            { icon: <Heart size={18} />, value: '∞', label: 'Memories' },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 text-center"
              style={{ background: '#FFFFFF', boxShadow: '0 2px 12px rgba(26,27,60,0.06)', border: '1px solid rgba(108,99,255,0.08)' }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white mx-auto mb-2"
                style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)' }}
              >
                {stat.icon}
              </div>
              <p className="text-2xl font-extrabold" style={{ color: '#1A1B3C' }}>{stat.value}</p>
              <p className="text-xs" style={{ color: '#6B7280' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Technology */}
        <div
          className="rounded-3xl p-8 mb-8"
          style={{ background: '#FFFFFF', boxShadow: '0 4px 24px rgba(26,27,60,0.06)', border: '1px solid rgba(108,99,255,0.08)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
              style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)' }}
            >
              <Code size={16} />
            </div>
            <h2 className="text-xl font-bold" style={{ color: '#1A1B3C' }}>Built With</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Tailwind CSS', 'WebRTC Camera API', 'Canvas API', 'Vite'].map(tech => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(108,99,255,0.08)', color: '#6C63FF', border: '1px solid rgba(108,99,255,0.15)' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/frames')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all hover:scale-105 hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)', boxShadow: '0 8px 30px rgba(108,99,255,0.35)' }}
          >
            <Camera size={18} />
            Start Your Session
          </button>
          <p className="mt-4 text-xs flex items-center justify-center gap-1" style={{ color: '#6B7280' }}>
            Made with <Heart size={12} fill="#D946EF" style={{ color: '#D946EF' }} /> for PKKMB FIK
          </p>
        </div>
      </div>
    </div>
  );
}
