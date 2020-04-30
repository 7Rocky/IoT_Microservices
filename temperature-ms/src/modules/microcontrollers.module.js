const axios = require('axios')

const { B_TERMISTOR, ORCHESTRATOR_MS, REFRESH_TIME } = require('../app/constants/constants')

const PING_TIMEOUT = REFRESH_TIME / 2

module.exports = class MicrocontrollersModule {

  constructor() {
    this.microcontrollers = []
  }

  pingMicro(micro) {
    const inactiveInterval = setInterval(async () => {
      try {
        await axios.get(`http://${micro.ip}/temperature`)
        console.log('micro is no more inactive')
        //const idx = microcontrollers.indexOf(micro)
        micro.isInactive = false
        //microcontrollers[idx] = micro
        clearInterval(inactiveInterval)
      } catch (error) {
        console.log('micro is still inactive')
      }
    }, PING_TIMEOUT)
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

    const response = await axios.get(`http://${ORCHESTRATOR_MS}/microcontrollers/temperature`)
    this.microcontrollers = response.data
    this.microcontrollers.forEach(micro => micro.isInactive = false)
    return this.microcontrollers
  }

}
