const axios = require('axios')

const { B_TERMISTOR, MICROCONTROLLERS_MS } = require('../app/constants/constants')

module.exports = class MicrocontrollersModule {

  constructor(measure) {
    this.measure = measure
  }

  digitalToReal(digital, sensor) {
    switch (sensor) {
      case 'Grove - Moisture':
      case 'Fake Grove - Moisture':
        return Number((digital * 100 / 950).toFixed(1))
      case 'Grove - Temperature':
      case 'Fake Grove - Temperature':
        return Number((1 / (Math.log(1023 / digital - 1) / B_TERMISTOR + 1 / 298.15) - 273.15).toFixed(1))
    }
  }

  getMicrocontrollers = async () => {
    const response = await axios.get(`http://${MICROCONTROLLERS_MS}/${this.measure}`)
    return response.data
  }

}
