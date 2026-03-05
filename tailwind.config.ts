import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "var(--color-surface)",
        panel: "var(--color-panel)",
        edge: "var(--color-edge)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
      },
      boxShadow: {
        panel: "0 12px 40px -20px rgba(5, 15, 40, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
