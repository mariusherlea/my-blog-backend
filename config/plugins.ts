export default ({ env }) => {
  console.log('SMTP_USERNAME:', env('SMTP_USERNAME'));
  return {
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
        },
        settings: {
          defaultFrom: env('SMTP_USERNAME'),
          defaultReplyTo: env('SMTP_USERNAME'),
        },
      },
    },
  };
};
