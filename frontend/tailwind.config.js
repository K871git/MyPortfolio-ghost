/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        surface: '#111111',
        elevated: '#171717',
        ink: '#FAFAFA',
        muted: '#B3B3B3',
        blue: '#4F8CFF',
        orange: '#FF8A00',
        success: '#3DDC84',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        container: '1200px',
      },
      spacing: {
        section: '180px',
        'section-sm': '120px',
      },
      backgroundImage: {
        glass: 'linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05))',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: 1 },
          '50%, 100%': { opacity: 0 },
        },
        pulseDot: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.4, transform: 'scale(0.85)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        pulseDot: 'pulseDot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
