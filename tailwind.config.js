/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0A0E1A',
          surface: '#12172B',
          border: '#1E2A4A',
        },
        light: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          border: '#E2E8F0',
        },
        primary: {
          blue: '#2563EB',
          light: '#3B82F6',
          lighter: '#60A5FA',
          dark: '#1E40AF',
        },
        accent: {
          violet: '#7C3AED',
          cyan: '#06B6D4',
          green: '#10B981',
        },
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(to bottom, #0A0E1A, #000000)',
        'blue-gradient': 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)',
        'violet-gradient': 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%)',
        'glow-gradient': 'radial-gradient(circle at center, rgba(37, 99, 235, 0.2) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(37, 99, 235, 0.3)',
        'glow-md': '0 0 25px rgba(37, 99, 235, 0.4)',
        'glow-lg': '0 0 35px rgba(37, 99, 235, 0.5)',
        'glow-xl': '0 0 50px rgba(59, 130, 246, 0.6)',
        'glow-violet': '0 0 25px rgba(124, 58, 237, 0.4)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 25px rgba(37, 99, 235, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
