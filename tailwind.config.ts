import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary: Dark Blue #185b9e - for headings, buttons, important UI
        primary: {
          50: '#e8f2fb',
          100: '#cce0f5',
          200: '#99c2eb',
          300: '#66a3e0',
          400: '#3385d6',
          500: '#185b9e', // Base brand color
          DEFAULT: '#185b9e',
          600: '#144d86',
          700: '#103f6e',
          800: '#0c3156',
          900: '#08233e',
          950: '#041526',
        },
        // Accent: Light Blue #31aeff - for CTAs, links, highlights
        accent: {
          50: '#e6f6ff',
          100: '#ccedff',
          200: '#99dbff',
          300: '#66c9ff',
          400: '#31aeff', // Base brand color
          DEFAULT: '#31aeff',
          500: '#0099f0',
          600: '#007acc',
          700: '#005c99',
          800: '#003d66',
          900: '#001f33',
        },
        // Semantic surface colors for theming
        surface: {
          light: '#ffffff',
          'light-elevated': '#f8fbff',
          dark: '#0d1f35',
          'dark-elevated': '#142d4a',
        },
        // Text colors
        text: {
          primary: '#185b9e',
          'primary-dark': '#e8f4ff',
          secondary: '#4a6a8a',
          'secondary-dark': '#9ebdd9',
          muted: '#7a9ab8',
          'muted-dark': '#6a8aa8',
        },
        // Border colors
        border: {
          light: '#d4e4f4',
          dark: '#1e4066',
        },
      },
      backgroundColor: {
        // Convenience aliases
        'theme-light': '#f8fbff',
        'theme-dark': '#0a1628',
      },
      boxShadow: {
        subtle: '0 6px 20px rgba(24, 91, 158, 0.08)',
        'subtle-dark': '0 6px 20px rgba(0, 0, 0, 0.3)',
        glow: '0 0 20px rgba(49, 174, 255, 0.3)',
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
        sans: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
}

export default config
