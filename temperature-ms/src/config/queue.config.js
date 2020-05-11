const RABBITMQ_HOST = process.env.RABBITMQ_HOSTNAME || '192.168.1.222' // '192.168.99.100'
const RABBITMQ_PORT = process.env.RABBITMQ_SERVICE_PORT || 31300

module.exports = {
  PASSWORD: process.env.RABBITMQ_DEFAULT_PASS || 'password',
  QUEUE_NAME: process.env.QUEUE_NAME_TEMPERATURE || 'temperatures',
  RABBITMQ: `${RABBITMQ_HOST}:${RABBITMQ_PORT}`,
  USERNAME: process.env.RABBITMQ_DEFAULT_USER || 'user',
}
