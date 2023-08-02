/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/posts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', 'body[data-theme-mode="dark"]'],
  theme: {
    extend: {
      screens: {
        md: '760px',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sands-serif'],
        mono: ['var(--font-mono)', 'Menlo', 'Courier', 'monospace'],
      },
      colors: {
        mainText: 'rgb(var(--color-main-text) / <alpha-value>)',
        subText: 'rgb(var(--color-sub-text) / <alpha-value>)',
        contentBlack: 'rgb(var(--color-content-black) / <alpha-value>)',
        backgroundBlack: 'rgb(var(--color-background-black) / <alpha-value>)',
        backgroundWhite: 'rgb(var(--color-background-white) / <alpha-value>)',
        dimWhite: 'rgb(var(--color-dim-white) / <alpha-value>)',

        contentText: 'rgb(var(--color-content-text) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        reverseBackground:
          'rgb(var(--color-reverse-background) / <alpha-value>)',
        contentBackground:
          'rgb(var(--color-content-background) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        horizontal: 'rgb(var(--color-horizontal) / <alpha-value>)',
        blockquoteBackground: 'var(--color-blockquote-background)',
        inlineCodeBackground: 'var(--color-inline-code-background)',
      },
    },
  },
  plugins: [],
};
