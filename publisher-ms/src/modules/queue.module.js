const amqp = require('amqplib/callback_api')

const { PASSWORD, RABBITMQ, USERNAME } = require('../config/config')

const url = `amqp://${USERNAME}:${PASSWORD}@${RABBITMQ}/`
let amqpConn = null

const start = () => {
  amqp.connect(`${url}?heartbeat=60`, (error, conn) => {
    if (error) {
      console.error('[AMQP]', error.message)
      return setTimeout(start, 1000)
    }

    conn.on('error', error => {
      if (error.message !== 'Connection closing') {
        console.error('[AMQP] conn error', error.message)
      }
    })

    conn.on('close', () => {
      console.error('[AMQP] reconnecting')
      return setTimeout(start, 1000)
    })

    console.log('[AMQP] connected')
    amqpConn = conn
    startPublisher()
  })
}

const closeOnErr = error => {
  if (!error) return false
  console.error('[AMQP] error', error)
  amqpConn.close()
  return true
}

let pubChannel = null
const offlinePubQueue = []

const startPublisher = () => {
  amqpConn.createConfirmChannel((error, ch) => {
    if (closeOnErr(error)) return
      ch.on('error', (error) => {
      console.error('[AMQP] channel error', error.message)
    })
  
    ch.on('close', () => {
      console.log('[AMQP] channel closed')
    })

    pubChannel = ch
    while (true) {
      const m = offlinePubQueue.shift()
      if (!m) break
      _publish(m[0], m[1], m[2])
    }
  })
}

const _publish = (exchange, routingKey, content) => {
  try {
    pubChannel.publish(
      exchange,
      routingKey,
      content,
      { persistent: true },
      (error, ok) => {
        if (error) {
          console.error('[AMQP] publish', error)
          offlinePubQueue.push([exchange, routingKey, content])
          pubChannel.connection.close()
        }
      }
    )
  } catch (error) {
    console.error('[AMQP] publish', error.message)
    offlinePubQueue.push([exchange, routingKey, content])
  }
}

module.exports = class Queue {

  constructor(queue) {
    this.queue = queue
    start()
  }

  publish(message) {
    console.log(message)
    _publish('', this.queue, Buffer.from(JSON.stringify(message)))
  }

}
