import fs from "node:fs";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pkg from "./package.json" with { type: "json" };

// Peer dependencies are provided by the app, so they (and their subpaths) are never bundled
const peers = Object.keys(pkg.peerDependencies);
const external = (id) => peers.some((peer) => id === peer || id.startsWith(`${peer}/`));

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
      entry: fileURLToPath(new URL("./src/index.js", import.meta.url)),
      formats: ["es"],
      fileName: () => "olaii-common.js",
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
  },
}));
