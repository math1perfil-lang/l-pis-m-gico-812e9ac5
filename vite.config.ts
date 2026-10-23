import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// Id único deste build: o app instalado compara com /version.json para saber se há versão nova.
const BUILD_ID = Date.now().toString(36);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    __BUILD_ID__: JSON.stringify(mode === "development" ? "dev" : BUILD_ID),
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: "emit-version-json",
      apply: "build" as const,
      generateBundle() {
        this.emitFile({ type: "asset", fileName: "version.json", source: JSON.stringify({ id: BUILD_ID }) });
      },
    },
    VitePWA({
      registerType: "prompt", // a aplicação da versão nova é feita em src/pwaUpdate.ts
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "pwa-icon-192.png", "pwa-icon-512.png"],
      manifest: {
        name: "Pandoorga - Aprenda, Jogue, Transforme",
        short_name: "Pandoorga",
        description: "Plataforma educativa gamificada para crianças de 6 a 15 anos. Ganhe moedas estudando e troque por benefícios reais para sua família.",
        theme_color: "#6366f1",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "pwa-icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "pwa-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB limit
        runtimeCaching: [
          {
            // O arquivo de versão nunca pode vir do cache
            urlPattern: ({ url }: { url: URL }) => url.pathname === "/version.json",
            handler: "NetworkOnly",
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
