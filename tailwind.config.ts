import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit"],
      },
      height: {
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
      },
      colors: {
        'primary': '#FD6423',
        'hover-bg': '#FEEBE2',
        'hover-border': '#FFFFFE',
        'active-bg': '#E2CBC0',
        'active-border': '#2f3132',
        'smoke': 'rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [daisyui],
  darkMode: ["selector", '[data-theme="dark"]'],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#FD6423",
          secondary: "#FEEBE2",
          accent: "#000000",
          "base-100": "#FFFFFE",
          "--color-card": "#f5f5f5",
          "base-200": "#D9D9D9",
          "base-300": "#FEEBE2",
        },
        dark: {
          primary: "#FD6423",
          secondary: "#E2CBC0",
          accent: "#ffffff",
          "base-100": "#191919",
          "--color-card": "#2f3132",
          "base-200": "#9C9C9C",
          "base-300": "#FEEBE2",
        },
      },
    ],
  },
} satisfies Config;
