/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // All colors reference CSS variables so they swap on theme toggle.
        // Variables are defined as bare RGB channels (e.g. "5 5 5") so that
        // Tailwind's opacity modifier syntax (bg-surface/70) works correctly.
        bg:       'rgb(var(--c-bg)       / <alpha-value>)',
        surface:  'rgb(var(--c-surface)  / <alpha-value>)',
        elevated: 'rgb(var(--c-elevated) / <alpha-value>)',
        ink:      'rgb(var(--c-ink)      / <alpha-value>)',
        muted:    'rgb(var(--c-muted)    / <alpha-value>)',
        blue:     'rgb(var(--c-blue)     / <alpha-value>)',
        orange:   'rgb(var(--c-orange)   / <alpha-value>)',
        success:  'rgb(var(--c-success)  / <alpha-value>)',
        // border is white in dark mode, near-black in light mode.
        // Use border-border/10 instead of border-white/10 everywhere.
        border:   'rgb(var(--c-border)   / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        container: '1200px',
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
          '50%':      { opacity: 0.4, transform: 'scale(0.85)' },
        },
      },
      animation: {
        blink:    'blink 1s step-end infinite',
        pulseDot: 'pulseDot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
