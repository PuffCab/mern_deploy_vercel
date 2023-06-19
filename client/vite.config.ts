import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //REVIEW[epic=deploy, seq=4] To make sure vite always start our client app on the same port, we declare it.This localhost url should match the one declared as allowed origin in our index.js
  server: {
    port: 5174,
  },
});
