import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        'wave-slow': 'wave 20s ease-in-out infinite',
        'wave-medium': 'wave 15s ease-in-out infinite',
        'wave-fast': 'wave 12s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

export default config 