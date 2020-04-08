const amqp = require('amqplib');

const { HOST, PASSWORD, PORT, USERNAME } = require('../config/queue.config');

module.exports = class Queue {

  constructor(queue) {
    this.queue = queue;
  }

  publish(message) {
    amqp.connect(`amqp://${USERNAME}:${PASSWORD}@${HOST}:${PORT}`)
      .then(connection => {
        return connection.createChannel()
          .then(async channel => {
            await channel.assertQueue(this.queue, { durable: true });
            channel.sendToQueue(this.queue, Buffer.from(message));
            console.log(`Sent message: ${message}`);

            return channel.close();
          })
          .finally(() => connection.close());
      })
      .catch(console.warn);
  }

};
