import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FramesPage from './pages/FramesPage';
import PhotoboothPage from './pages/PhotoboothPage';
import HowItWorksPage from './pages/HowItWorksPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/frames" element={<FramesPage />} />
          <Route path="/photobooth" element={<PhotoboothPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
