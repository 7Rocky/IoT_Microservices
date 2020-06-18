const MICROCONTROLLERS_HOST = process.env.MICROCONTROLLERS_MS_HOSTNAME || 'localhost' // '192.168.99.100'
const MICROCONTROLLERS_PORT = process.env.MICROCONTROLLERS_MS_SERVICE_PORT || 6000

const RABBITMQ_HOST = process.env.RABBITMQ_HOSTNAME || '192.168.1.222' // '192.168.99.100'
const RABBITMQ_PORT = process.env.RABBITMQ_SERVICE_PORT || 31300

module.exports = {
  B_TERMISTOR: 4275,
  MICROCONTROLLERS_MS: `${MICROCONTROLLERS_HOST}:${MICROCONTROLLERS_PORT}`,
  PASSWORD: process.env.RABBITMQ_DEFAULT_PASS || 'password',
  PING_TIMEOUT: 5000,
  QUEUES_MEASURES: {
    humidity: process.env.QUEUE_HUMIDITY_NAME || 'humidities',
    light: process.env.QUEUE_LIGHT_NAME || 'lights',
    temperature: process.env.QUEUE_TEMPERATURE_NAME || 'temperatures'
  },
  RABBITMQ: `${RABBITMQ_HOST}:${RABBITMQ_PORT}`,
  USERNAME: process.env.RABBITMQ_DEFAULT_USER || 'user',
}
