const axios = require('axios')

const { B_TERMISTOR, MICROCONTROLLERS_MS, PING_TIMEOUT } = require('../app/constants/constants')

module.exports = class MicrocontrollersModule {

  constructor() {
    this.microcontrollers = []
  }

  pingMicro(micro) {
    const inactiveInterval = setInterval(async () => {
      try {
        await axios.get(`http://${micro.ip}/temperature`, { timeout: PING_TIMEOUT })
        console.log('micro is no more inactive')
        micro.isInactive = false
        clearInterval(inactiveInterval)
      } catch (error) {
        console.log('micro is still inactive')
      }
    }, PING_TIMEOUT + 1000)
  }

  digitalToReal(digital, sensor) {
    switch (sensor) {
      case 'Grove - Temperature':
      case 'Fake Grove - Temperature':
        return Number((1 / (Math.log(1023 / digital - 1) / B_TERMISTOR + 1 / 298.15) - 273.15).toFixed(1))
      default:
        return Number((1 / (Math.log(1023 / digital - 1) / B_TERMISTOR + 1 / 298.15) - 273.15).toFixed(1))
    }
  }

  async getMicrocontrollers() {
    if (this.microcontrollers && this.microcontrollers.length) return Promise.resolve(this.microcontrollers);

    const response = await axios.get(`http://${MICROCONTROLLERS_MS}/temperature`)
    this.microcontrollers = response.data
    this.microcontrollers.forEach(micro => micro.isInactive = false)
    return this.microcontrollers
  }

}
