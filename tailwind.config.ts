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
        'hero-gradient-animation': { // Added hero-gradient-animation keyframes
          '0%': {
            '--y-0': '0%',
            '--s-start-0': '3.1210986267166043%',
            '--s-end-0': '40%',
            '--x-0': '0%',
            '--c-0': 'hsla(295.99999999999994, 77%, 74%, 0.8)',
            '--x-1': '40%',
            '--s-start-1': '3.1210986267166043%',
            '--s-end-1': '40%',
            '--y-1': '0%',
            '--c-1': 'hsla(186.61764705882354, 77%, 74%, 0.8)',
            '--y-2': '0%',
            '--s-start-2': '3.1210986267166043%',
            '--s-end-2': '40%',
            '--c-2': 'hsla(236.91176470588243, 77%, 74%, 0.8)',
            '--x-2': '20%',
            '--y-3': '0%',
            '--s-start-3': '3.1210986267166043%',
            '--s-end-3': '40%',
            '--x-3': '60%',
            '--c-3': 'hsla(127.0588235294118, 77%, 74%, 0.8)',
            '--x-4': '80%',
            '--c-4': 'hsla(62.20588235294117, 77%, 74%, 0.8)',
            '--s-start-4': '3.1210986267166043%',
            '--s-end-4': '40%',
            '--y-4': '0%',
            '--s-start-5': '3%',
            '--s-end-5': '40%',
            '--y-5': '0%',
            '--c-5': 'hsla(23.823529411764703, 77%, 74%, 0.8)',
            '--x-5': '100%',
          },
          '100%': {
            '--y-0': '68%',
            '--s-start-0': '4',
            '--s-end-0': '75',
            '--x-0': '90%',
            '--c-0': 'hsla(295.99999999999994, 77%, 74%, 0.8)',
            '--x-1': '89%',
            '--s-start-1': '4',
            '--s-end-1': '75',
            '--y-1': '79%',
            '--c-1': 'hsla(186.61764705882354, 77%, 74%, 0.8)',
            '--y-2': '70%',
            '--s-start-2': '4',
            '--s-end-2': '75',
            '--c-2': 'hsla(236.91176470588243, 77%, 74%, 0.8)',
            '--x-2': '44%',
            '--y-3': '5%',
            '--s-start-3': '4',
            '--s-end-3': '75',
            '--x-3': '91%',
            '--c-3': 'hsla(127.0588235294118, 77%, 74%, 0.8)',
            '--x-4': '96%',
            '--c-4': 'hsla(62.20588235294117, 77%, 74%, 0.8)',
            '--s-start-4': '4',
            '--s-end-4': '75',
            '--y-4': '13%',
            '--s-start-5': '4',
            '--s-end-5': '75',
            '--y-5': '26%',
            '--c-5': 'hsla(23.823529411764703, 77%, 74%, 0.8)',
            '--x-5': '0%',
          }
        }
      },
      animation: {
        glow: 'glow 0.5s linear infinite',
        'hero-gradient-animation': 'hero-gradient-animation 5s linear infinite alternate', // Added hero-gradient-animation
      },
    },
  },

  plugins: [],
} satisfies Config;
