import { Resend } from "resend";

export default {
  init(providerOptions: any, settings: any) {
    const resend = new Resend(providerOptions.apiKey);

    return {
      async send(options: any) {
        const { to, from, subject, text, html } = options;

        try {
          await resend.emails.send({
            from: from || settings.defaultFrom,
            to,
            subject,
            text,
            html,
          });

          strapi.log.info(`Email trimis către ${to} prin Resend ✅`);
        } catch (err) {
          strapi.log.error("Eroare la trimiterea emailului prin Resend ❌", err);
          throw err;
        }
      },
    };
  },
};
