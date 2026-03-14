import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    })
  ],
  server: {
    host: true,
    allowedHosts: true,
    https: {
      key: fs.readFileSync("./local.dodam-dev.b1nd.com-key.pem"),
      cert: fs.readFileSync("./local.dodam-dev.b1nd.com.pem"),
    },
  },
});
