import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
      reporter: ["json-summary", "text-summary", "lcov"],
      reportsDirectory: "./src/coverage",
      // branches: 90,
      // functions: 90,
      // lines: 90,
      // statements: 90,
    },
  },
})
