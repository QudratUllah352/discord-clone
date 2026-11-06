import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await api.login({ email, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      }
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#404eed_0%,#5865F2_50%,#7289da_100%)] flex items-center justify-center p-6 relative">
      {/* Back to Home */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-white font-bold text-sm px-4 py-2 rounded-full bg-black/25 backdrop-blur-md border border-white/10 hover:bg-black/40 transition-all hover:-translate-y-0.5"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
        <span>Back to Home</span>
      </Link>

      {/* Login Card */}
      <div className="w-full max-w-[780px] bg-[#313338] rounded-lg shadow-2xl p-8 sm:p-10 grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-10 border border-white/5 text-[#F2F3F5]">
        {/* Left Form */}
        <div>
          <div className="text-center md:text-left mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Welcome back!</h1>
            <p className="text-sm text-[#949BA4]">We're so excited to see you again!</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="bg-[#ED4245]/20 border border-[#ED4245] text-[#ED4245] px-3.5 py-2.5 rounded text-xs font-semibold animate-in fade-in">
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-[#B5BAC1] uppercase tracking-wider mb-2" htmlFor="loginEmail">
                Email or Phone Number <span className="text-[#ED4245]">*</span>
              </label>
              <input
                id="loginEmail"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1E1F22] border border-black/40 rounded p-2.5 text-sm text-white focus:outline-none focus:border-[#00AFF4] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#B5BAC1] uppercase tracking-wider mb-2" htmlFor="loginPassword">
                Password <span className="text-[#ED4245]">*</span>
              </label>
              <input
                id="loginPassword"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1E1F22] border border-black/40 rounded p-2.5 text-sm text-white focus:outline-none focus:border-[#00AFF4] transition-colors"
              />
              <a href="#forgot" className="inline-block text-xs text-[#00AFF4] hover:underline font-medium mt-1.5">
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded text-sm transition-colors mt-2"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            <p className="text-xs text-[#949BA4] mt-1">
              Need an account?{' '}
              <Link to="/register" className="text-[#00AFF4] hover:underline font-semibold ml-1">
                Register
              </Link>
            </p>
          </form>
        </div>

        {/* Right QR Code Column */}
        <div className="hidden md:flex flex-col items-center justify-center text-center pl-8 border-l border-white/10">
          <div className="relative w-44 h-44 bg-white rounded-lg p-2 flex items-center justify-center mb-6 shadow-md">
            <svg className="w-full h-full fill-[#23272A]" viewBox="0 0 100 100">
              <rect x="5" y="5" width="26" height="26" rx="4" />
              <rect x="9" y="9" width="18" height="18" rx="2" fill="#FFFFFF" />
              <rect x="13" y="13" width="10" height="10" rx="2" />
              <rect x="69" y="5" width="26" height="26" rx="4" />
              <rect x="73" y="9" width="18" height="18" rx="2" fill="#FFFFFF" />
              <rect x="77" y="13" width="10" height="10" rx="2" />
              <rect x="5" y="69" width="26" height="26" rx="4" />
              <rect x="9" y="73" width="18" height="18" rx="2" fill="#FFFFFF" />
              <rect x="13" y="77" width="10" height="10" rx="2" />
              <rect x="36" y="8" width="8" height="8" rx="1" />
              <rect x="48" y="12" width="6" height="6" rx="1" />
              <rect x="38" y="24" width="6" height="6" rx="1" />
              <rect x="52" y="22" width="8" height="8" rx="1" />
              <rect x="10" y="38" width="8" height="8" rx="1" />
              <rect x="22" y="44" width="6" height="6" rx="1" />
              <rect x="72" y="38" width="6" height="6" rx="1" />
              <rect x="84" y="42" width="8" height="8" rx="1" />
              <rect x="38" y="72" width="8" height="8" rx="1" />
              <rect x="50" y="76" width="6" height="6" rx="1" />
              <rect x="68" y="68" width="8" height="8" rx="1" />
              <rect x="80" y="78" width="8" height="8" rx="1" />
            </svg>
            <div className="absolute w-10 h-10 rounded-full bg-[#5865F2] p-2 flex items-center justify-center shadow-[0_0_0_4px_#ffffff]">
              <svg className="w-full h-full fill-white" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Log in with QR Code</h2>
          <p className="text-xs text-[#949BA4] leading-relaxed max-w-[200px]">
            Scan this with the <strong className="text-white">Discord mobile app</strong> to log in instantly.
          </p>
        </div>
      </div>
    </div>
  );
}

