import React, { createContext, useContext, useState } from 'react';
import type { FrameData } from '../data/frames';

interface AppContextType {
  selectedFrame: FrameData | null;
  capturedPhotos: string[];
  selectFrame: (frame: FrameData) => void;
  setPhoto: (index: number, dataUrl: string) => void;
  resetPhotos: () => void;
  resetSession: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedFrame, setSelectedFrame] = useState<FrameData | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);

  const selectFrame = (frame: FrameData) => {
    setSelectedFrame(frame);
    setCapturedPhotos([]);
  };

  const setPhoto = (index: number, dataUrl: string) => {
    setCapturedPhotos(prev => {
      const next = [...prev];
      next[index] = dataUrl;
      return next;
    });
  };

  const resetPhotos = () => setCapturedPhotos([]);

  const resetSession = () => {
    setSelectedFrame(null);
    setCapturedPhotos([]);
  };

  return (
    <AppContext.Provider value={{ selectedFrame, capturedPhotos, selectFrame, setPhoto, resetPhotos, resetSession }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
