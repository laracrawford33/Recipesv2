/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/rbdlaqplgbfxxyluiyin\.supabase\.co\/rest\/v1\/.*$/,
      handler: "NetworkFirst",
      options: {
        cacheName: "supabase-api",
        networkTimeoutSeconds: 5,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60, // 1 hour
        },
        backgroundSync: {
          name: "supabase-sync-queue",
          options: { maxRetentionTime: 60 },
        },
      },
    },
    // keep default caching for static assets (next-pwa includes those)
  ],
});
module.exports = withPWA({
  reactStrictMode: true,
  // any other Next config you already have
});