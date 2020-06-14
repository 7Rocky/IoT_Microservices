const axios = require('axios')

const { B_TERMISTOR, MICROCONTROLLERS_MS, PING_TIMEOUT } = require('../app/constants/constants')

module.exports = class MicrocontrollersModule {

  constructor(measure) {
    this.measure = measure
    this.microcontrollers = []
  }

  pingMicro = micro => {
    const inactiveInterval = setInterval(async () => {
      try {
        await axios.get(`http://${micro.ip}/${micro.measure}`, { timeout: PING_TIMEOUT })
        micro.isInactive = false
        clearInterval(inactiveInterval)
      } catch (error) { }
    }, PING_TIMEOUT + 1000)
  }

  digitalToReal(digital, sensor) {
    switch (sensor) {
      case 'Grove - Moisture':
      case 'Fake Grove - Moisture':
        return Number((digital * 100 / 950).toFixed(1))
      case 'Grove - Temperature':
      case 'Fake Grove - Temperature':
        return Number((1 / (Math.log(1023 / digital - 1) / B_TERMISTOR + 1 / 298.15) - 273.15).toFixed(1))
      default:
        return Number((1 / (Math.log(1023 / digital - 1) / B_TERMISTOR + 1 / 298.15) - 273.15).toFixed(1))
    }
  }

  getMicrocontrollers = async () => {
    if (this.microcontrollers && this.microcontrollers.length) return Promise.resolve(this.microcontrollers)

    const response = await axios.get(`http://${MICROCONTROLLERS_MS}/${this.measure}`)
    this.microcontrollers = response.data
    this.microcontrollers.forEach(micro => micro.isInactive = false)
    return this.microcontrollers
  }

}
