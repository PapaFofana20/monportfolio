/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./script.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0EA5E9',
        secondary: '#06B6D4',
        accent: '#8B5CF6',
      },
      animation: {
        'blob': 'blob 8s infinite',
        'blob-delay-2000': 'blob 8s infinite 2s',
        'blob-delay-4000': 'blob 8s infinite 4s reverse',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'rippleEffect 0.6s ease-out',
        'gradient-shift': 'gradientShift 6s ease infinite',
        'bounce-down': 'bounceDown 0.8s ease',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '25%': {
            transform: 'translate(20px, -30px) scale(1.05)',
          },
          '50%': {
            transform: 'translate(-10px, 20px) scale(0.95)',
          },
          '75%': {
            transform: 'translate(30px, 10px) scale(1.02)',
          },
          '100%': {
            transform: 'translate(0, 0) scale(1)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        rippleEffect: {
          '0%': {
            boxShadow: '0 0 0 0 rgba(14, 165, 233, 0.7)',
          },
          '70%': {
            boxShadow: '0 0 0 10px rgba(14, 165, 233, 0)',
          },
          '100%': {
            boxShadow: '0 0 0 0 rgba(14, 165, 233, 0)',
          },
        },
        gradientShift: {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
        bounceDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        borderGlow: {
          '0%, 100%': {
            opacity: '0',
          },
          '50%': {
            opacity: '1',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
