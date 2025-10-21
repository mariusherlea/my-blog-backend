//config/plugins.ts
import path from "path";

export default ({ env }) => ({
  email: {
    config: {
      provider: path.join(process.cwd(), "dist/src/providers/email-resend"),
      providerOptions: {
        apiKey: env("RESEND_API_KEY"),
      },
      settings: {
        defaultFrom: env("EMAIL_FROM", "no-reply@resend.dev"),
        defaultReplyTo: env("EMAIL_FROM", "no-reply@resend.dev"),
      },
    },
  },
});
