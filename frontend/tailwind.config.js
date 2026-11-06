/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        discord: {
          darker: '#1E1F22',   // Server list sidebar
          dark: '#2B2D31',     // Channel list sidebar
          normal: '#313338',   // Chat area
          accent: '#5865F2',   // Blurple
          accentHover: '#4752C4',
          fuchsia: '#EB459E',  // Gradient accent
          green: '#23A55A',   // Online status dot
          yellow: '#F0B232',  // Idle status
          red: '#ED4245',     // DND / error
          textNormal: '#DBDEE1',
          textMuted: '#949BA4',
        }
      },
      fontFamily: {
        discord: ['"gg sans"', 'Inter', 'Noto Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

