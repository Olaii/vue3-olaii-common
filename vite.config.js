import fs from "node:fs";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pkg from "./package.json" with { type: "json" };

// Dependencies and peer dependencies are installed by the app, so they (and their subpaths) are never bundled
const packages = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)];
const external = (id) => packages.some((name) => id === name || id.startsWith(`${name}/`));

// The demo runs on https://test.olaii.com:9100 when the shared dev certificates exist, so the
// .olaii.com auth cookies are readable. Without them it falls back to http://localhost:9100.
function devHttps() {
  try {
    return {
      key: fs.readFileSync("../test.olaii.com-key.pem"),
      cert: fs.readFileSync("../test.olaii.com.pem"),
    };
  } catch {
    return null;
  }
}
const https = devHttps();

export default defineConfig(({ command }) => ({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server:
    command === "serve"
      ? {
          port: 9100,
          host: https ? "test.olaii.com" : "localhost",
          https: https || undefined,
        }
      : undefined,
  build: {
    lib: {
      entry: {
        "olaii-common": fileURLToPath(new URL("./src/index.js", import.meta.url)),
        sentry: fileURLToPath(new URL("./src/sentry.js", import.meta.url)),
      },
      formats: ["es"],
      fileName: (format, entryName) => `${entryName}.js`,
      cssFileName: "olaii-common",
    },
    rollupOptions: {
      external,
    },
    sourcemap: true,
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.spec.js"],
    setupFiles: ["src/test/setup.js"],
  },
}));
