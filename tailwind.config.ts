import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#111110',
        surface: '#1A1A18',
        accent: '#E84C1E',
        ink: '#F7F5F0',
        muted: '#6B6B65',
        border: '#2A2A27',
      },
      fontFamily: {
        heading: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
