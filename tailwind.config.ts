import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B1F3B', // deep navy
          600: '#0E274B',
          700: '#0A1A31',
        },
        accent: {
          DEFAULT: '#2E6BFF', // soft modern blue
          600: '#2A5EDE',
        },
        soft: {
          bg: '#F8FAFC', // off-white background
        },
      },
      boxShadow: {
        subtle: '0 6px 20px rgba(0,0,0,0.06)',
      },
      transitionTimingFunction: {
        pleasant: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 700ms var(--ease, cubic-bezier(0.22,1,0.36,1)) both',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
}

export default config
