import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lilac: '#E98AF0',
        portage: '#8A8FF0',
        sulu: '#8AF096',
        khaki: '#ECF08A',
        tacao: '#F0B28A',
        spray: '#8AE4F0',
        grey: '#1A1C2C',
        background: '#FCFAF3',
      },
      fontFamily: {
        heading: ['Tiempos-Heading', 'Georgia', 'serif'],
        subheading: ['Tiempos-Regular', 'Georgia', 'serif'],
        text: ['Sohne', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        glow: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'hero-gradient-animation': { /* existing keyframes */ },
        'pulse-glow-purple': {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(233, 138, 240, 0.4)',
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(233, 138, 240, 0.6)',
          },
        },
        'pulse-glow-green': {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(138, 240, 150, 0.4)',
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(138, 240, 150, 0.6)',
          },
        }
      },
      animation: {
        glow: 'glow 0.5s linear infinite',
        'hero-gradient-animation': 'hero-gradient-animation 5s linear infinite alternate',
        'gradient-x': 'gradient-x 3s ease infinite',
        'pulse-glow-purple': 'pulse-glow-purple 3s ease-in-out infinite',
        'pulse-glow-green': 'pulse-glow-green 3s ease-in-out infinite',
      },
    },
  },

  plugins: [],
} satisfies Config;