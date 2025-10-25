// export default {
//   async afterCreate(event) {
//     const { result } = event;

//     await strapi.plugins['email'].services.email.send({
//       to: 'mariusherlea@gmail.com', // sau o listă de abonați
//       subject: `Noul articol: ${result.title}`,
//       text: `A fost publicat un nou articol: ${result.title}\n\n${result.description}`,
//     });
//   },
// };

//src/api/article/content-types/article/lifecycles.ts

// export default {
//   async afterCreate(event: any) {
//     const { result } = event;
   

//     try {
//       // 1. Obține toți abonații
//       const subscribers = await strapi.entityService.findMany('api::subscriber.subscriber', {
//         fields: ['email'],
//       });

//       // 2. Trimite un email fiecărui abonat
//       for (const subscriber of subscribers) {
//         await strapi.plugins['email'].services.email.send({
//           to: subscriber.email,
//           from: 'mariusherlea@gmail.com',
//           subject: `🆕 Articol nou: ${result.title}`,
//           text: `Salut!\n\nA fost publicat un nou articol pe blog: "${result.title}".\n\nVizitează blogul pentru a-l citi.`,
//         });
//       }

//       strapi.log.info(`Emailuri trimise către ${subscribers.length} abonați.`);

//     } catch (error) {
//       strapi.log.error('Eroare la trimiterea emailurilor către abonați:', error);
//     }
//   },
// };


export default {
  async afterCreate(event: any) {
    await sendEmailsToSubscribers(event);
  },

  async afterUpdate(event: any) {
    const { result } = event;
    if (result.publishedAt) {
      await sendEmailsToSubscribers(event);
    }
  },
};

async function sendEmailsToSubscribers(event: any) {
  const { result } = event;

  try {
    const subscribers = await strapi.entityService.findMany('api::subscriber.subscriber', {
      fields: ['email'],
    });

    for (const subscriber of subscribers) {
      await strapi.plugins['email'].services.email.send({
        to: subscriber.email,
        from: 'no-reply@resend.dev', // 👈 același ca în plugins.ts
        subject: `🆕 Articol nou: ${result.title}`,
        text: `Salut!\n\nA fost publicat un nou articol pe blog: "${result.title}".\n\nVizitează blogul pentru a-l citi.`,
      });
    }

    strapi.log.info(`✅ Emailuri trimise către ${subscribers.length} abonați.`);
  } catch (error) {
    strapi.log.error('❌ Eroare la trimiterea emailurilor către abonați:', error);
  }
}
