//config/server.ts
export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
   url: env('PUBLIC_URL'), // 👈 FOARTE IMPORTANT
  app: {
    keys: env.array('APP_KEYS'),
  },
  encryptionKey: env("STRAPI_ENCRYPTION_KEY"),
});
