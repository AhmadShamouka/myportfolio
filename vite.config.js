import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({
  // GitHub Pages serves from /myportfolio/; local dev stays at /
  base: command === "build" ? "/myportfolio/" : "/",
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    open: true,
  },
}));
