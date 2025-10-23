import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: [
      "node_modules",
      "dist",
      ".next",
      ".pnpm-store",
      "src/app/api/**/*.test.ts",
    ],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    jsx: "automatic",
  },
});
