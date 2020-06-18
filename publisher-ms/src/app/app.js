const { PING_TIMEOUT, QUEUES_MEASURES } = require('../config/config')
const QueueModule = require('../modules/queue.module')

const { getMicrocontrollers, requestMeasure } = require('../modules/request.module')

const measures = [ 'humidity', 'light', 'temperature' ]

const publishMeasure = async measure => {
  const queue = new QueueModule(QUEUES_MEASURES[measure])
  const micros = await getMicrocontrollers(measure)

  return await Promise.all(
    micros.map(async micro => {
      const response = await requestMeasure(micro)
      if (response) queue.publish(response)
    })
  )
}

const main = async () => {
  await Promise.all(measures.map(publishMeasure))
  await new Promise(resolve => setTimeout(resolve, PING_TIMEOUT))
}

module.exports = { main }
