const axios = require('axios')

const { B_TERMISTOR, MICROCONTROLLERS_MS, PING_TIMEOUT, QUEUES_MEASURES } = require('./config/config')
const QueueModule = require('./modules/queue.module')

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

  switch (micro.measure) {
    case 'light':
      return {
        date: date.toUTCString(),
        digital_value: data[micro.measure],
        ip: micro.ip,
        measure: micro.measure,
        sensor: micro.sensor,
        timestamp: date.getTime(),
        username: micro.username
      }
    case 'humidity':
    case 'temperature':
      return {
        date: date.toUTCString(),
        digital_value: data[micro.measure],
        ip: micro.ip,
        measure: micro.measure,
        real_value: digitalToReal(data[micro.measure], micro.sensor),
        sensor: micro.sensor,
        timestamp: date.getTime(),
        username: micro.username
      }
  }
}

const getMicrocontrollers = async measure => {
  const response = await axios.get(`http://${MICROCONTROLLERS_MS}/${measure}`)
  this.microcontrollers = response.data
  return this.microcontrollers
}

const requestMeasure = async micro => {
  try {
    const response = await axios.get(`http://${micro.ip}/${micro.measure}`, { timeout: PING_TIMEOUT })
    return getMessage(response.data, micro)
  } catch (error) { }
}

const publishMeasure = async measure => {
  const queue = new QueueModule(QUEUES_MEASURES[measure])
  const micros = await getMicrocontrollers(measure)

  return Promise.all(
    micros.map(async micro => {
      const response = await requestMeasure(micro)
      if (response) queue.publish(response)
    })
  )
}

async function main() {
  const measures = [ 'humidity', 'light', 'temperature' ]

  await Promise.all(measures.map(publishMeasure))
  await new Promise(resolve => setTimeout(resolve, PING_TIMEOUT))
}

main().then(() => process.exit())
