import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans': ['Noto Sans', 'system-ui', 'sans-serif'],
        'noto-serif': ['Noto Serif', 'Georgia', 'serif'],
        'noto-mono': ['Noto Mono', 'Courier New', 'monospace'],
        'audiowide': ['Audiowide', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config 