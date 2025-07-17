export default {
  async afterCreate(event) {
    const { result } = event;

    await strapi.plugins['email'].services.email.send({
      to: 'mariusherlea@gmail.com', // sau o listă de abonați
      subject: `Noul articol: ${result.title}`,
      text: `A fost publicat un nou articol: ${result.title}\n\n${result.description}`,
    });
  },
};
