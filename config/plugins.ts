//config/plugins.ts
export default ({ env }) => ({
  email: {
    config: {
      provider: 'resend',
      providerOptions: {
        apiKey: env('RESEND_API_KEY'),
      },
      settings: {
        defaultFrom: env('EMAIL_FROM', 'no-reply@resend.dev'),
        defaultReplyTo: env('EMAIL_FROM', 'no-reply@resend.dev'),
      },
    },
  },
});

