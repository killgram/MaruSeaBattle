import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import autoprefixer from "autoprefixer";
import viteCompression from "vite-plugin-compression";
import legacy from "@vitejs/plugin-legacy";
import { VitePWA } from "vite-plugin-pwa";
import { createHtmlPlugin } from "vite-plugin-html";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import postcssNesting from "postcss-nesting";
import AtImport from "postcss-import";
import csso from "postcss-csso";

/** @type {import('vite').UserConfig} */
export default () => {
  return defineConfig({
    plugins: [
      react(),
      viteCompression({
        filter: /\.(js|mjs|css)$/i,
      }),
      legacy({
        targets: ["defaults", "not IE 11"],
      }),
      VitePWA({ registerType: "autoUpdate" }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: "Maru Sea Battle",
            description: "Maru Sea Battle app",
          },
        },
      }),
    ],
    css: {
      postcss: {
        plugins: [AtImport, autoprefixer({}), postcssNesting, csso],
      },
    },
    build: {
      sourcemap: true,
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
    resolve: {
      alias: [
        {
          find: "@assets",
          replacement: path.resolve(__dirname, "./src/assets"),
        },
        {
          find: "@components",
          replacement: path.resolve(__dirname, "./src/components"),
        },
        {
          find: "@configurations",
          replacement: path.resolve(__dirname, "./src/configurations"),
        },
        {
          find: "@navigators",
          replacement: path.resolve(__dirname, "./src/navigators"),
        },
        { find: "@pages", replacement: path.resolve(__dirname, "./src/pages") },
        { find: "@store", replacement: path.resolve(__dirname, "./src/store") },
        { find: "@utils", replacement: path.resolve(__dirname, "./src/utils") },
      ],
    },
  });
};
