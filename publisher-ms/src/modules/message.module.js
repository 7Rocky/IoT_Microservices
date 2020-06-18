const { B_TERMISTOR } = require('../config/config')

const digitalToReal = (digital, sensor) => {
  switch (sensor) {
    case 'Grove - Moisture':
    case 'Fake Grove - Moisture':
      return Number((digital * 100 / 950).toFixed(1))
    case 'Grove - Temperature':
    case 'Fake Grove - Temperature':
      return Number((1 / (Math.log(1023 / digital - 1) / B_TERMISTOR + 1 / 298.15) - 273.15).toFixed(1))
  }
}

const getMessage = (data, micro) => {
  const date = new Date()
  const message = {
    date: date.toUTCString(),
    digital_value: data[micro.measure],
    ip: micro.ip,
    measure: micro.measure,
    sensor: micro.sensor,
    timestamp: date.getTime(),
    username: micro.username
  }

  switch (micro.measure) {
    case 'humidity':
    case 'temperature':
      message.real_value = digitalToReal(data[micro.measure], micro.sensor)
    case 'light':
  }

  return message
}

module.exports = { getMessage }
