const {
  AUTH_MS,
  MEASURE_MS,
  MICROCONTROLLERS_MS
} = require('../../src/config/services.config')

module.exports = {
  delete: (url='', body={ }) => {
    if (url.includes(`${MICROCONTROLLERS_MS}`)) {
      return Promise.resolve({ data: 'OK' })
    }
  },
  get: (url='') => {
    if (url.includes(`${MICROCONTROLLERS_MS}`)) {
      return Promise.resolve({ data: require('../microcontrollers.json') })
    } else if (url.includes(`${MEASURE_MS}`)) {
      return Promise.resolve({ 
        data: url.includes('temperatures') ? require('../temperature-stats.json') : require('../temperature.json')
      })
    }
  },
  post: (url='', body={ }) => {
    if (url.includes(`${AUTH_MS}/login`)) {
      return Promise.resolve({ data: body.username === 'Rocky' && body.password && body.refreshToken })
    } else if (url.includes(`${AUTH_MS}/register`)) {
      return Promise.resolve({ data: body.username !== 'Rocky' && body.password && body.refreshToken })
    } else if (url.includes(`${AUTH_MS}/refresh`)) {
      return Promise.resolve({ data: body.username === 'Rocky' && body.newRefreshToken && body.refreshToken })
    } else if (url.includes(`${MICROCONTROLLERS_MS}`)) {
      return Promise.resolve({ data: body })
    }
  },
  put: (url='', body={ }) => {
    if (url.includes(`${MICROCONTROLLERS_MS}`)) {
      return Promise.resolve({ data: body })
    }
  }
}
