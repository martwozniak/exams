import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
        display: ["group-hover"],
    },
},
  plugins: [],
} satisfies Config;
