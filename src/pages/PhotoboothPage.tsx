import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Camera, CameraOff, FlipHorizontal, Sliders, X,
  Check, RotateCcw, ChevronRight, Download, QrCode, RefreshCcw,
  Layers, AlertCircle, Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getFrameImageUrl } from '../data/frames';
import FrameComposite from '../components/FrameComposite';
import { supabase } from '../lib/supabase';
import { QRCodeSVG } from 'qrcode.react';

// ── Types ──────────────────────────────────────────────────────────────────────

type Step = 'prepare' | 'capture' | 'preview' | 'result';
type CamState = 'off' | 'requesting' | 'active' | 'error';
type CaptureState = 'idle' | 'countdown' | 'flash' | 'captured';

const EFFECTS: { id: string; label: string; filter: string }[] = [
  { id: 'original',  label: 'Original',  filter: 'none' },
  { id: 'brighten',  label: 'Brighten',  filter: 'brightness(1.25)' },
  { id: 'darken',    label: 'Darken',    filter: 'brightness(0.75)' },
  { id: 'warm',      label: 'Warm',      filter: 'saturate(1.4) sepia(0.3) brightness(1.05)' },
  { id: 'cool',      label: 'Cool',      filter: 'saturate(0.8) hue-rotate(30deg)' },
  { id: 'blur',      label: 'Blur',      filter: 'blur(2px)' },
  { id: 'sharpen',   label: 'Sharpen',   filter: 'contrast(1.3) saturate(1.1)' },
  { id: 'beauty',    label: 'Beauty',    filter: 'blur(0.5px) brightness(1.1) saturate(0.9)' },
  { id: 'contrast',  label: 'Contrast',  filter: 'contrast(1.5)' },
];

const STEPS_LABELS = ['Prepare', 'Capture', 'Preview', 'Finish'];

// ── Step indicator ─────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: Step }) {
  const idx = ['prepare', 'capture', 'preview', 'result'].indexOf(current);
  return (
    <div className="flex items-center gap-1 justify-center">
      {STEPS_LABELS.map((label, i) => (
        <React.Fragment key={label}>
          <div className="flex items-center gap-1">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
              style={{
                background: i < idx ? '#6C63FF' : i === idx ? 'linear-gradient(135deg,#6C63FF,#D946EF)' : 'rgba(108,99,255,0.1)',
                color: i <= idx ? '#fff' : '#6C63FF',
              }}
            >
              {i < idx ? <Check size={11} /> : `0${i + 1}`}
            </div>
            <span
              className="text-xs font-semibold hidden sm:block"
              style={{ color: i === idx ? '#6C63FF' : i < idx ? '#6B7280' : '#CBD5E1' }}
            >
              {label}
            </span>
          </div>
          {i < STEPS_LABELS.length - 1 && (
            <div className="w-6 h-px" style={{ background: i < idx ? '#6C63FF' : '#E5E7EB' }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Effects panel ─────────────────────────────────────────────────────────────

function EffectsPanel({ active, onSelect, onClose }: { active: string; onSelect: (id: string) => void; onClose: () => void }) {
  return (
    <div
      className="absolute inset-0 z-30 flex flex-col justify-end sm:justify-center sm:items-center"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ background: 'rgba(13,13,26,0.7)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="w-full sm:w-80 rounded-t-3xl sm:rounded-3xl p-5 max-h-[70vh] overflow-y-auto scroll-hidden"
        style={{ background: '#1A1B3C' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white">Camera Effects</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <X size={14} style={{ color: '#fff' }} />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {EFFECTS.map(ef => (
            <button
              key={ef.id}
              onClick={() => onSelect(ef.id)}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all hover:scale-105"
              style={{
                background: active === ef.id ? 'rgba(108,99,255,0.3)' : 'rgba(255,255,255,0.06)',
                border: active === ef.id ? '1.5px solid #6C63FF' : '1.5px solid transparent',
              }}
            >
              <div
                className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center text-white text-xs"
                style={{ background: 'rgba(108,99,255,0.2)', filter: ef.filter === 'none' ? undefined : ef.filter }}
              >
                <Camera size={16} />
              </div>
              <span className="text-xs font-medium text-white/80">{ef.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── QR placeholder ─────────────────────────────────────────────────────────────

function QRDisplay({ dataUrl }: { dataUrl: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="w-40 h-40 rounded-2xl flex items-center justify-center"
        style={{
          background: '#FFFFFF',
          border: '2px solid rgba(108,99,255,0.2)',
          padding: '10px',
        }}
      >
        {dataUrl ? (
          <QRCodeSVG
            value={dataUrl}
            size={140}
            level="H"
            includeMargin={false}
          />
        ) : (
          <p className="text-xs text-gray-500 text-center">
            QR unavailable
          </p>
        )}
      </div>

      <p
        className="text-xs font-medium text-center"
        style={{ color: '#6B7280' }}
      >
        Scan to Get Your Photo
      </p>

      <p
        className="text-xs text-center max-w-48"
        style={{ color: '#9CA3AF' }}
      >
        Scan this code with your phone.
      </p>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function PhotoboothPage() {
  const navigate = useNavigate();
  const { selectedFrame, capturedPhotos, setPhoto, resetPhotos } = useApp();

  const [step, setStep] = useState<Step>('prepare');
  const [camState, setCamState] = useState<CamState>('off');
  const [captureState, setCaptureState] = useState<CaptureState>('idle');
  const [currentSlot, setCurrentSlot] = useState(0);
  const [countdownVal, setCountdownVal] = useState<number | null>(null);
  const [activeEffect, setActiveEffect] = useState('original');
  const [showEffects, setShowEffects] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [showQR, setShowQR] = useState(false);
  const [resultUrl, setResultUrl] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const countdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const effectFilter = EFFECTS.find(e => e.id === activeEffect)?.filter ?? 'none';

  // ── Camera ───────────────────────────────────────────────────────────────────

  const startCamera = useCallback(async () => {
    setCamState('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCamState('active');
      setStep('capture');
    } catch {
      setCamState('error');
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    setCamState('off');
  }, []);

  const flipCamera = useCallback(async () => {
    stopCamera();
    const newMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newMode);
  }, [facingMode, stopCamera]);

  // Auto restart camera after flip
  useEffect(() => {
    if (step === 'capture' && camState === 'off') {
      startCamera();
    }
  }, [facingMode]); // eslint-disable-line

  useEffect(() => {
    return () => {
      stopCamera();
      if (countdownTimerRef.current) clearTimeout(countdownTimerRef.current);
    };
  }, [stopCamera]);

  // ── Capture ──────────────────────────────────────────────────────────────────

  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d')!;

    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    if (effectFilter !== 'none') {
      ctx.filter = effectFilter;
    }
    ctx.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setPhoto(currentSlot, dataUrl);

    setCaptureState('flash');
    setTimeout(() => setCaptureState('captured'), 300);
  }, [currentSlot, effectFilter, facingMode, setPhoto]);

  const startCountdown = useCallback(() => {
    if (captureState !== 'idle') return;
    setCaptureState('countdown');
    setCountdownVal(3);

    const tick = (n: number) => {
      setCountdownVal(n);
      if (n > 1) {
        countdownTimerRef.current = setTimeout(() => tick(n - 1), 1000);
      } else {
        countdownTimerRef.current = setTimeout(() => {
          setCountdownVal(null);
          capturePhoto();
        }, 1000);
      }
    };
    countdownTimerRef.current = setTimeout(() => tick(2), 1000);
  }, [captureState, capturePhoto]);

  const retakePhoto = () => {
    setPhoto(currentSlot, '');
    setCaptureState('idle');
  };

  const nextPhoto = () => {
    if (!selectedFrame) return;
    const next = currentSlot + 1;
    if (next >= selectedFrame.slots.length) {
      // All photos done — go to preview
      setStep('preview');
    } else {
      setCurrentSlot(next);
      setCaptureState('idle');
    }
  };

  // ── Result generation ─────────────────────────────────────────────────────────

 const createResult = useCallback(async () => {
  if (!selectedFrame) return;

  setStep('result');
  stopCamera();

  /*
   * Final canvas menggunakan ukuran yang sama secara proporsional
   * dengan frame asli.
   *
   * Koordinat slot dari frame_slots.json menggunakan pixel asli,
   * sehingga semua titik harus diskalakan dari ukuran frame asli
   * ke ukuran canvas final.
   */
  const W = 800;
  const H = Math.round(W / selectedFrame.aspectRatio);

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  /*
   * Scale dari koordinat asli template → canvas final.
   *
   * Contoh:
   *
   * Frame asli:
   * 1152 × 2048
   *
   * Canvas:
   * 800 × 1422
   *
   * Maka semua titik polygon akan mengikuti
   * perbandingan tersebut.
   */
  const scaleX = W / selectedFrame.width;
  const scaleY = H / selectedFrame.height;

  /*
   * Draw setiap foto ke polygon slot masing-masing.
   */
  for (let i = 0; i < selectedFrame.slots.length; i++) {
    const slot = selectedFrame.slots[i];
    const photo = capturedPhotos[i];

    if (!photo || !slot.points || slot.points.length < 3) {
      continue;
    }

    const img = new Image();

    img.src = photo;

    await new Promise<void>(resolve => {
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });

    if (!img.naturalWidth || !img.naturalHeight) {
      continue;
    }

    /*
     * Konversi titik polygon dari pixel asli frame
     * ke pixel canvas final.
     */
    const points = slot.points.map(([x, y]) => ({
      x: x * scaleX,
      y: y * scaleY,
    }));

    /*
     * Bounding box polygon.
     *
     * Kita membutuhkan bounding box untuk menentukan
     * ukuran foto yang akan mengisi area polygon.
     */
    const xs = points.map(point => point.x);
    const ys = points.map(point => point.y);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const boxWidth = maxX - minX;
    const boxHeight = maxY - minY;

    if (boxWidth <= 0 || boxHeight <= 0) {
      continue;
    }

    /*
     * Foto dibuat cover terhadap bounding box polygon.
     *
     * Ini mempertahankan perilaku object-cover yang
     * sebelumnya sudah digunakan oleh preview.
     */
    const imageScale = Math.max(
      boxWidth / img.naturalWidth,
      boxHeight / img.naturalHeight
    );

    const drawWidth = img.naturalWidth * imageScale;
    const drawHeight = img.naturalHeight * imageScale;

    const drawX = minX + (boxWidth - drawWidth) / 2;
    const drawY = minY + (boxHeight - drawHeight) / 2;

    /*
     * Clip menggunakan polygon ASLI template.
     *
     * Ini bagian terpenting.
     *
     * Foto hanya boleh muncul di dalam polygon
     * slot frame tersebut.
     */
    ctx.save();

    ctx.beginPath();

    points.forEach((point, pointIndex) => {
      if (pointIndex === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });

    ctx.closePath();
    ctx.clip();

    /*
     * Gambar foto di dalam bounding box polygon.
     */
    ctx.drawImage(
      img,
      drawX,
      drawY,
      drawWidth,
      drawHeight
    );

    ctx.restore();
  }

  /*
   * Setelah semua foto selesai:
   *
   * Foto berada di belakang.
   * Frame artwork asli berada di atas.
   */
const frameImg = new Image();

frameImg.crossOrigin = 'anonymous';
frameImg.src = selectedFrame.templateTransparentUrl;

  await new Promise<void>(resolve => {
    frameImg.onload = () => resolve();
    frameImg.onerror = () => resolve();
  });

if (frameImg.naturalWidth > 0 && frameImg.naturalHeight > 0) {
  ctx.globalCompositeOperation = 'source-over';

  ctx.drawImage(
    frameImg,
    0,
    0,
    W,
    H
  );
}

  /*
   * Hasil akhir disimpan sebagai PNG.
   */
const blob = await new Promise<Blob | null>(resolve =>
  canvas.toBlob(resolve, 'image/png')
);

if (!blob) {
  console.error('Failed to create photo blob.');
  return;
}

const fileName = `photo-${Date.now()}.png`;

const { data: uploadData, error: uploadError } = await supabase.storage
  .from('photobooth')
  .upload(fileName, blob, {
    contentType: 'image/png',
    upsert: false,
  });

console.log('UPLOAD DATA:', uploadData);
console.log('UPLOAD ERROR:', uploadError);

if (uploadError) {
  console.error('Supabase upload error:', uploadError);
  return;
}

const { data: publicUrlData } = supabase.storage
  .from('photobooth')
  .getPublicUrl(fileName);

console.log('PUBLIC URL:', publicUrlData.publicUrl);

setResultUrl(publicUrlData.publicUrl);
}, [selectedFrame, capturedPhotos, stopCamera]);

const downloadResult = () => {
  if (!resultUrl) return;

  const a = document.createElement('a');
  a.href = resultUrl;
  a.download = `fik-photobooth-${Date.now()}.png`;
  a.click();
};

const takeAnother = () => {
  resetPhotos();
  setCurrentSlot(0);
  setCaptureState('idle');
  setResultUrl('');
  setShowQR(false);
  setStep('prepare');
  setCamState('off');
};

const changeFrame = () => {
  stopCamera();
  navigate('/frames');
};

  // ── Guard: no frame selected ──────────────────────────────────────────────────

  if (!selectedFrame) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-5 page-enter" style={{ background: '#0D0D1A' }}>
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(108,99,255,0.2)', border: '1px solid rgba(108,99,255,0.3)' }}
        >
          <Layers size={28} style={{ color: '#6C63FF' }} />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-2">No Frame Selected</h2>
          <p className="text-sm" style={{ color: '#6B7280' }}>Please choose a frame before starting the photobooth.</p>
        </div>
        <button
          onClick={() => navigate('/frames')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)' }}
        >
          <Layers size={15} /> Choose a Frame
        </button>
      </div>
    );
  }

  const totalSlots = selectedFrame.slots.length;
  const filledCount = capturedPhotos.filter(Boolean).length;

  // ── RENDER ────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col page-enter" style={{ background: '#0D0D1A' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <button
          onClick={() => { stopCamera(); navigate(-1); }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-80"
          style={{ color: '#fff', background: 'rgba(255,255,255,0.08)' }}
        >
          <ArrowLeft size={15} /> Back
        </button>

        <div className="flex items-center gap-2">
          <Sparkles size={14} style={{ color: '#D946EF' }} />
          <span className="font-bold text-white text-sm">Photobooth</span>
        </div>

        <div
          className="text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(108,99,255,0.2)', color: '#A5B4FC' }}
        >
          {step === 'result' ? 'Done' : `${filledCount} / ${totalSlots}`}
        </div>
      </div>

      {/* Step indicator */}
      <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <StepIndicator current={step} />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto scroll-hidden">

        {/* ── PREPARE STEP ─────────────────────────────────────────────────── */}
        {step === 'prepare' && (
          <div className="max-w-lg mx-auto px-4 py-8 flex flex-col items-center gap-6 text-center">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-2">Ready?</h2>
              <p className="font-semibold" style={{ color: '#D946EF' }}>Let's capture your moment.</p>
              <p className="text-sm mt-2" style={{ color: '#6B7280' }}>
                Position yourself inside the camera and get ready for your first shot.
              </p>
            </div>

            {/* Selected frame info */}
            <div
              className="w-full rounded-2xl p-4 flex items-center gap-4"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(108,99,255,0.2)' }}
            >
              <div
                className="w-16 rounded-xl overflow-hidden flex-shrink-0"
                style={{ background: 'rgba(108,99,255,0.1)', aspectRatio: String(selectedFrame.aspectRatio) }}
              >
                <img
                  src={getFrameImageUrl(selectedFrame)}
                  alt={selectedFrame.displayName}
                  className="w-full h-full object-contain"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
                />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-white text-sm">{selectedFrame.displayName}</p>
                <p className="text-xs mb-1" style={{ color: '#6B7280' }}>{selectedFrame.categoryLabel}</p>
                <p className="text-xs" style={{ color: '#A5B4FC' }}>{totalSlots} photo slot{totalSlots > 1 ? 's' : ''} to fill</p>
              </div>
              <button
                onClick={changeFrame}
                className="text-xs px-3 py-1.5 rounded-lg font-semibold"
                style={{ background: 'rgba(108,99,255,0.15)', color: '#A5B4FC' }}
              >
                Change
              </button>
            </div>

            {/* Camera placeholder */}
            <div
              className="w-full max-w-sm rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-4 py-12"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(108,99,255,0.3)', aspectRatio: '4/3' }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(108,99,255,0.15)' }}
              >
                <Camera size={28} style={{ color: '#6C63FF' }} />
              </div>
              <div className="text-center px-4">
                <p className="text-sm font-semibold text-white mb-1">Camera is ready</p>
                <p className="text-xs" style={{ color: '#6B7280' }}>Allow camera access to start.</p>
              </div>
            </div>

            <button
              onClick={startCamera}
              disabled={camState === 'requesting'}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #D946EF 100%)', boxShadow: '0 8px 30px rgba(108,99,255,0.4)' }}
            >
              <Camera size={18} />
              {camState === 'requesting' ? 'Enabling…' : 'Enable Camera'}
            </button>

            {camState === 'error' && (
              <div
                className="w-full rounded-xl p-4 flex items-start gap-3"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                <AlertCircle size={16} style={{ color: '#F87171', flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#F87171' }}>We couldn't access your camera.</p>
                  <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>Please check your browser permissions and try again.</p>
                  <button onClick={startCamera} className="text-xs font-semibold mt-2" style={{ color: '#F87171' }}>
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── CAPTURE STEP ─────────────────────────────────────────────────── */}
        {step === 'capture' && (
          <div className="flex flex-col lg:flex-row gap-4 p-4 max-w-6xl mx-auto">
            {/* Camera column */}
            <div className="flex-1 flex flex-col gap-3">
              {/* Progress */}
              <div className="flex items-center justify-between px-1">
                <span className="text-sm font-bold text-white">
                  PHOTO {currentSlot + 1} / {totalSlots}
                </span>
                <div
                  className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: camState === 'active' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                    color: camState === 'active' ? '#4ADE80' : '#F87171',
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: camState === 'active' ? '#4ADE80' : '#F87171' }}
                  />
                  Camera {camState === 'active' ? 'Active' : 'Inactive'}
                </div>
              </div>

              {/* Camera view */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ background: '#0A0A14', aspectRatio: '4/3' }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${facingMode === 'user' ? 'camera-mirror' : ''}`}
                  style={{ filter: effectFilter !== 'none' ? effectFilter : undefined }}
                />

                {/* Countdown overlay */}
                {captureState === 'countdown' && countdownVal !== null && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'rgba(13,13,26,0.6)' }}
                  >
                    <div
                      key={countdownVal}
                      className="countdown-num text-white font-extrabold"
                      style={{ fontSize: '96px', lineHeight: 1, textShadow: '0 4px 20px rgba(108,99,255,0.8)' }}
                    >
                      {countdownVal}
                    </div>
                  </div>
                )}

                {/* Flash */}
                {captureState === 'flash' && (
                  <div className="absolute inset-0 bg-white shutter-flash pointer-events-none" />
                )}

                {/* Captured overlay */}
                {captureState === 'captured' && (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                    style={{ background: 'rgba(13,13,26,0.5)' }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: '#22C55E' }}
                    >
                      <Check size={28} style={{ color: '#fff' }} strokeWidth={3} />
                    </div>
                    <p className="font-bold text-white text-sm">Photo {currentSlot + 1} captured!</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={retakePhoto}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold"
                        style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
                      >
                        <RotateCcw size={14} /> Retake
                      </button>
                      <button
                        onClick={nextPhoto}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #6C63FF, #D946EF)' }}
                      >
                        {currentSlot + 1 >= totalSlots ? 'Preview' : 'Next Photo'}
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Effects panel overlay */}
                {showEffects && (
                  <EffectsPanel
                    active={activeEffect}
                    onSelect={id => { setActiveEffect(id); setShowEffects(false); }}
                    onClose={() => setShowEffects(false)}
                  />
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between px-2">
                {/* Effects */}
                <button
                  onClick={() => setShowEffects(v => !v)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.08)', color: '#fff' }}
                >
                  <Sliders size={15} />
                  Effects
                </button>

                {/* Capture */}
                <button
                  onClick={startCountdown}
                  disabled={captureState !== 'idle' || camState !== 'active'}
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-110 disabled:opacity-40 disabled:scale-100"
                  style={{
                    background: 'linear-gradient(135deg, #6C63FF, #D946EF)',
                    boxShadow: captureState === 'idle' ? '0 0 0 4px rgba(108,99,255,0.25), 0 8px 24px rgba(108,99,255,0.4)' : 'none',
                  }}
                >
                  <Camera size={24} style={{ color: '#fff' }} />
                </button>

                {/* Flip */}
                <button
                  onClick={flipCamera}
                  disabled={captureState !== 'idle'}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 disabled:opacity-40"
                  style={{ background: 'rgba(255,255,255,0.08)', color: '#fff' }}
                >
                  <FlipHorizontal size={15} />
                  Flip
                </button>
              </div>

              {/* Slot progress dots */}
              <div className="flex items-center justify-center gap-2">
                {Array.from({ length: totalSlots }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all"
                    style={{
                      width: i === currentSlot ? 20 : 8,
                      height: 8,
                      background: capturedPhotos[i]
                        ? '#22C55E'
                        : i === currentSlot
                        ? '#6C63FF'
                        : 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Frame preview column */}
            <div className="lg:w-56 xl:w-64 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-white uppercase tracking-widest">Selected Frame</p>
                <button onClick={changeFrame} className="text-xs px-2.5 py-1 rounded-lg font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: '#A5B4FC' }}>
                  Change
                </button>
              </div>
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(108,99,255,0.15)' }}>
                <FrameComposite
                  frame={selectedFrame}
                  photos={capturedPhotos}
                  currentSlot={currentSlot}
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-white">{selectedFrame.displayName}</p>
                <p className="text-xs" style={{ color: '#6B7280' }}>{filledCount} of {totalSlots} filled</p>
              </div>
            </div>
          </div>
        )}

        {/* ── PREVIEW STEP ─────────────────────────────────────────────────── */}
        {step === 'preview' && (
          <div className="max-w-lg mx-auto px-4 py-8 flex flex-col items-center gap-6">
            <div className="text-center">
              <p className="text-sm font-semibold mb-1" style={{ color: '#D946EF' }}>✦ Almost there!</p>
              <h2 className="text-3xl font-extrabold text-white mb-2">YOUR PHOTOS</h2>
              <p className="text-sm" style={{ color: '#6B7280' }}>Your photobooth composition is ready to review.</p>
            </div>

            <div
              className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
              style={{ border: '1px solid rgba(108,99,255,0.2)' }}
            >
              <FrameComposite frame={selectedFrame} photos={capturedPhotos} />
            </div>

            {/* Photo strip thumbnails */}
            <div className="flex gap-2">
              {capturedPhotos.slice(0, totalSlots).map((p, i) => (
                p ? (
                  <img
                    key={i}
                    src={p}
                    alt={`Photo ${i + 1}`}
                    className="w-12 h-12 rounded-lg object-cover"
                    style={{ border: '2px solid rgba(108,99,255,0.4)' }}
                  />
                ) : null
              ))}
            </div>

            <div className="flex gap-3 w-full">
              <button
                onClick={takeAnother}
                className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                Start Over
              </button>
              <button
                onClick={createResult}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #D946EF)' }}
              >
                Create Photo
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* ── RESULT STEP ──────────────────────────────────────────────────── */}
        {step === 'result' && (
          <div className="max-w-lg mx-auto px-4 py-8 flex flex-col items-center gap-6">
            <div className="text-center">
              <p className="text-sm font-semibold mb-1" style={{ color: '#D946EF' }}>It's yours. ♡</p>
              <h2 className="text-3xl font-extrabold text-white mb-2">YOUR MOMENT</h2>
              <p className="text-sm" style={{ color: '#6B7280' }}>Your photobooth result is ready.</p>
            </div>

            {/* Final image */}
            <div
              className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
              style={{ border: '2px solid rgba(108,99,255,0.3)' }}
            >
              {resultUrl ? (
                <img src={resultUrl} alt="Your photobooth result" className="w-full h-auto" />
              ) : (
                <FrameComposite frame={selectedFrame} photos={capturedPhotos} />
              )}
            </div>

            {/* QR */}
            {showQR && (
              <div
                className="w-full rounded-2xl p-6 flex flex-col items-center gap-4"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(108,99,255,0.2)' }}
              >
                <QRDisplay dataUrl={resultUrl} />
              </div>
            )}

            {/* Actions */}
            <div className="w-full flex flex-col gap-3">
              <button
                onClick={downloadResult}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-bold text-white transition-all hover:scale-105 hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #D946EF)', boxShadow: '0 8px 30px rgba(108,99,255,0.4)' }}
              >
                <Download size={18} />
                Download Photo
              </button>

              <button
                onClick={() => setShowQR(v => !v)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-80"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <QrCode size={16} />
                {showQR ? 'Hide QR Code' : 'Show QR Code'}
              </button>

              <div className="flex gap-3">
                <button
                  onClick={takeAnother}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#A5B4FC' }}
                >
                  <RefreshCcw size={14} /> Take Another
                </button>
                <button
                  onClick={changeFrame}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#A5B4FC' }}
                >
                  <Layers size={14} /> Change Frame
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
