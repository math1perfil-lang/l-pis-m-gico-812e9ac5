import { defineConfig, type Plugin } from "vite";
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
      apply: "build",
      generateBundle() {
        this.emitFile({ type: "asset", fileName: "version.json", source: JSON.stringify({ id: BUILD_ID }) });
      },
    } satisfies Plugin,
    VitePWA({
      // O app deixou de usar service worker: ele guardava uma cópia antiga do app no celular e
      // o ícone da tela de início ficava preso na versão velha. Este modo gera um sw.js que se
      // apaga sozinho (limpa o cache e recarrega), o que conserta os apps já instalados.
      // A instalação na tela de início continua funcionando pelo manifest.
      // Novas versões chegam por src/versionCheck.ts.
      selfDestroying: true,
      registerType: "autoUpdate",
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
        // O index.html NÃO fica guardado no cache do app: ele sempre vem da rede (com cópia de
        // reserva só para uso sem internet). Assim o app instalado nunca fica preso a uma tela
        // antiga. Os arquivos js/css têm hash no nome, então são seguros de guardar.
        globPatterns: ["**/*.{js,css,ico,png,svg,jpg,jpeg,webp}"],
        navigateFallback: null,
        cleanupOutdatedCaches: true,
        // A versão nova do service worker assume na hora, sem esperar o app ser fechado.
        skipWaiting: true,
        clientsClaim: true,
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB limit
        runtimeCaching: [
          {
            // Telas (index.html): rede primeiro; se estiver sem internet, usa a última cópia
            urlPattern: ({ request }: { request: Request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "pages",
              networkTimeoutSeconds: 4,
            },
          },
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
