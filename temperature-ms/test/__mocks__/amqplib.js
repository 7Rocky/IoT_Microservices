let sent = false;

module.exports = {
  sent: () => sent,
  connect: url => {
    return Promise.resolve({
      close: () => {
        return;
      },
      createChannel: () => {
        return Promise.resolve({
          assertQueue: (queue, options) => {
            return Promise.resolve();
          },
          close: () => {
            return;
          },
          sendToQueue: (queue, message) => {
            sent = true;
            return;
          }
        });
      }
    });
  }
};
