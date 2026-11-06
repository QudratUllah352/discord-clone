import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    displayName: '',
    username: '',
    password: '',
    month: '',
    day: '',
    year: '',
    optIn: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const birthDate = formData.year && formData.month && formData.day 
        ? `${formData.year}-${formData.month}-${formData.day}` 
        : null;

      const data = await api.register({
        email: formData.email,
        password: formData.password,
        username: formData.username,
        displayName: formData.displayName,
        birthDate,
      });

      if (data.token) {
        localStorage.setItem('token', data.token);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      }

      navigate('/app');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => currentYear - 13 - i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

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

      {/* Register Card */}
      <div className="w-full max-w-[480px] bg-[#313338] rounded-lg shadow-2xl p-8 sm:p-10 border border-white/5 text-[#F2F3F5]">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Create an account</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-[#ED4245]/20 border border-[#ED4245] text-[#ED4245] px-3.5 py-2.5 rounded text-xs font-semibold animate-in fade-in">
              {error}
            </div>
          )}
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-[#B5BAC1] uppercase tracking-wider mb-2">
              Email <span className="text-[#ED4245]">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#1E1F22] border border-black/40 rounded p-2.5 text-sm text-white focus:outline-none focus:border-[#00AFF4] transition-colors"
            />
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-xs font-bold text-[#B5BAC1] uppercase tracking-wider mb-2">
              Display Name <span className="text-[10px] text-[#949BA4] font-normal lowercase">(optional)</span>
            </label>
            <input
              type="text"
              name="displayName"
              placeholder="How you'll appear"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full bg-[#1E1F22] border border-black/40 rounded p-2.5 text-sm text-white placeholder:text-[#949BA4] focus:outline-none focus:border-[#00AFF4] transition-colors"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-bold text-[#B5BAC1] uppercase tracking-wider mb-2">
              Username <span className="text-[#ED4245]">*</span>
            </label>
            <input
              type="text"
              name="username"
              required
              placeholder="unique_username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-[#1E1F22] border border-black/40 rounded p-2.5 text-sm text-white placeholder:text-[#949BA4] focus:outline-none focus:border-[#00AFF4] transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-[#B5BAC1] uppercase tracking-wider mb-2">
              Password <span className="text-[#ED4245]">*</span>
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#1E1F22] border border-black/40 rounded p-2.5 text-sm text-white focus:outline-none focus:border-[#00AFF4] transition-colors"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-bold text-[#B5BAC1] uppercase tracking-wider mb-2">
              Date of Birth <span className="text-[#ED4245]">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                name="month"
                required
                value={formData.month}
                onChange={handleChange}
                className="bg-[#1E1F22] border border-black/40 rounded p-2.5 text-xs sm:text-sm text-[#DBDEE1] focus:outline-none focus:border-[#00AFF4] cursor-pointer"
              >
                <option value="" disabled>Month</option>
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, idx) => (
                  <option key={m} value={idx + 1}>{m}</option>
                ))}
              </select>

              <select
                name="day"
                required
                value={formData.day}
                onChange={handleChange}
                className="bg-[#1E1F22] border border-black/40 rounded p-2.5 text-xs sm:text-sm text-[#DBDEE1] focus:outline-none focus:border-[#00AFF4] cursor-pointer"
              >
                <option value="" disabled>Day</option>
                {days.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <select
                name="year"
                required
                value={formData.year}
                onChange={handleChange}
                className="bg-[#1E1F22] border border-black/40 rounded p-2.5 text-xs sm:text-sm text-[#DBDEE1] focus:outline-none focus:border-[#00AFF4] cursor-pointer"
              >
                <option value="" disabled>Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Opt-in */}
          <div className="flex items-start gap-2.5 mt-2">
            <input
              type="checkbox"
              id="optIn"
              name="optIn"
              checked={formData.optIn}
              onChange={handleChange}
              className="mt-1 w-4 h-4 accent-[#5865F2] cursor-pointer"
            />
            <label htmlFor="optIn" className="text-xs text-[#949BA4] leading-snug cursor-pointer">
              (Optional) It's okay to send me emails with Discord updates, tips, and special offers. You can opt out at any time.
            </label>
          </div>

          {/* Continue button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5865F2] hover:bg-[#4752C4] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded text-sm transition-colors mt-2"
          >
            {loading ? 'Creating Account...' : 'Continue'}
          </button>

          {/* Terms */}
          <p className="text-[11px] text-[#949BA4] leading-relaxed">
            By registering, you agree to Discord's <a href="#terms" className="text-[#00AFF4] hover:underline">Terms of Service</a> and <a href="#privacy" className="text-[#00AFF4] hover:underline">Privacy Policy</a>.
          </p>

          <p className="text-xs text-[#949BA4]">
            <Link to="/login" className="text-[#00AFF4] hover:underline font-semibold">
              Already have an account?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

