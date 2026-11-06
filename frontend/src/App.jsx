import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DownloadPage from './pages/DownloadPage';
import NitroPage from './pages/NitroPage';
import DiscoverPage from './pages/DiscoverPage';
import QuestsPage from './pages/QuestsPage';
import SafetyPage from './pages/SafetyPage';
import SupportPage from './pages/SupportPage';
import BlogPage from './pages/BlogPage';
import CareersPage from './pages/CareersPage';
import AppPage from './pages/AppPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Navbar Link Pages */}
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/nitro" element={<NitroPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/quests" element={<QuestsPage />} />
        <Route path="/safety" element={<SafetyPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/careers" element={<CareersPage />} />

        {/* Discord App (post-login) */}
        <Route path="/app" element={<AppPage />} />

        {/* Fallback to home */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
