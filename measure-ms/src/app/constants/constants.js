const MICROCONTROLLERS_HOST = process.env.MICROCONTROLLERS_MS_HOSTNAME || 'localhost' // '192.168.99.100'
const MICROCONTROLLERS_PORT = process.env.MICROCONTROLLERS_MS_SERVICE_PORT || 6000

module.exports = {
  B_TERMISTOR: 4275,
  MICROCONTROLLERS_MS: `${MICROCONTROLLERS_HOST}:${MICROCONTROLLERS_PORT}`,
  PING_TIMEOUT: 5000,
  REFRESH_TIME: process.env.NODE_ENV === 'test' ? 6000 : 60000
}