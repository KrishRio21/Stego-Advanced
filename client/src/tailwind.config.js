/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'dark-bg': '#1a1a1a',
          'dark-text': '#e0e0e0',
          'primary': '#3b82f6',
          'primary-hover': '#2563eb',
          'error': '#ef4444',
          'message-bg': '#2d2d2d',
        },
        animation: {
          'pulse-glow': 'pulse-glow 1.5s ease-in-out infinite',
          'ripple': 'ripple 0.6s linear',
        },
        keyframes: {
          'pulse-glow': {
            '0%, 100%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
            '50%': { boxShadow: '0 0 15px rgba(59, 130, 246, 0.8)' },
          },
          ripple: {
            '0%': { transform: 'scale(0)', opacity: '1' },
            '100%': { transform: 'scale(4)', opacity: '0' },
          },
        },
      },
    },
    plugins: [],
    darkMode: 'class',
  }