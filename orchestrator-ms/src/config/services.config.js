const AUTH_MS_HOST = process.env.AUTH_MS_HOSTNAME || 'localhost'
const AUTH_MS_PORT = process.env.AUTH_MS_SERVICE_PORT || 5000
const MICROCONTROLLERS_MS_HOST = process.env.MICROCONTROLLERS_MS_HOSTNAME || 'localhost'
const MICROCONTROLLERS_MS_PORT = process.env.MICROCONTROLLERS_MS_SERVICE_PORT || 6000
const TEMPERATURE_MS_HOST = process.env.TEMPERATURE_MS_HOSTNAME || 'localhost'
const TEMPERATURE_MS_PORT = process.env.TEMPERATURE_MS_SERVICE_PORT || 4000

module.exports = {
  AUTH_MS: `${AUTH_MS_HOST}:${AUTH_MS_PORT}`,
  MICROCONTROLLERS_MS: `${MICROCONTROLLERS_MS_HOST}:${MICROCONTROLLERS_MS_PORT}`,
  TEMPERATURE_MS: `${TEMPERATURE_MS_HOST}:${TEMPERATURE_MS_PORT}`
}
