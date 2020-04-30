const amqp = require('amqplib')

const { PASSWORD, RABBITMQ, USERNAME } = require('../config/queue.config')

module.exports = class Queue {

  constructor(queue) {
    this.queue = queue
  }

  async publish(message) {
    try {
      const connection = await amqp.connect(`amqp://${USERNAME}:${PASSWORD}@${RABBITMQ}`)
      try {
        const channel = await connection.createChannel()
        await channel.assertQueue(this.queue, { durable: true })
        channel.sendToQueue(this.queue, Buffer.from(message))
        console.log(`Sent message: ${message}`)
        channel.close()
      } finally { 
        connection.close()
      }
    } catch (error) {
      console.warn(error)
    }
  }

}
