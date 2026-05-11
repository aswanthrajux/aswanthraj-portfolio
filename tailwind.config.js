/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,mdx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Metropolis', 'Inter', 'sans-serif'],
        display: ['Metropolis', '"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Metropolis', 'Inter', 'sans-serif'],
      },
      colors: {
        bg: 'var(--color-bg)',
        subtle: 'var(--color-subtle)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        muted: 'var(--color-muted)',
      },
      transitionProperty: {
        theme: 'color, background-color, border-color, fill, stroke',
      },
    },
  },
  plugins: [],
}
