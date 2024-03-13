import type { Config } from "tailwindcss";
import daisyui from "daisyui";

import * as colors from 'tailwindcss/colors';

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    darkMode: 'class',
    extend: {
      colors: {
        primary: '#FD6423',
        secondary: '#FEEBE2',
        secondaryDark: '#CDB4A8',
        accent: '#37CDFA',
        ...colors,
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
