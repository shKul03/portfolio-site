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
        bg: '#F2EFE7',
        surface: '#EAE7DF',
        accent: '#3B47E8',
        ink: '#0F0F0E',
        muted: '#5C5A54',
        border: '#D4D0C8',
      },
      fontFamily: {
        heading: ['var(--font-barlow)', 'Impact', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
