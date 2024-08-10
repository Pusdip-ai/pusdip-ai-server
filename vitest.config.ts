import { defineConfig } from "vitest/config";
import { config } from "dotenv";

export default defineConfig({
  test: {
    globals: true,
    exclude: ["lib", "node_modules"],
    setupFiles: ["dotenv/config"],
    testTimeout: 60 * 1000,
    env: {
      ...config({ path: "./.env.local" }).parsed,
    },
    environment: "node",
  },
});
