const { MICROCONTROLLERS_MS } = require('../../src/app/constants/constants')

module.exports = {
  get: (url='', options) => {
    if (url.includes(`${MICROCONTROLLERS_MS}/humidity`)) {
      return Promise.resolve({ 
        data: require('../microcontrollers.json').filter(micro => micro.measure === 'humidity')
      })
    } else if (url.includes(`${MICROCONTROLLERS_MS}/light`)) {
      return Promise.resolve({ 
        data: require('../microcontrollers.json').filter(micro => micro.measure === 'light')
      })
    } else if (url.includes(`${MICROCONTROLLERS_MS}/temperature`)) {
      return Promise.resolve({ 
        data: require('../microcontrollers.json').filter(micro => micro.measure === 'temperature')
      })
    } else if (url.includes('/humidity')) {
      return Promise.resolve({ 
        data: require('../humidity.json')
      })
    } else if (url.includes('/light')) {
      return Promise.resolve({ 
        data: require('../light.json')
      })
    } else if (url.includes('/temperature')) {
      return Promise.resolve({ 
        data: require('../temperature.json')
      })
    }
  },
  post: (url='', body, options) => {
    if (url.includes('/light/off')) {
      return Promise.resolve({ 
        data: { light: 0 }
      })
    } else if (url.includes('/light/on')) {
      return Promise.resolve({ 
        data: { light: 1 }
      })
    }
  }
}
