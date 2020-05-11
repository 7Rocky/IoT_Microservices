const axios = require('axios')

const { QUEUE_NAME } = require('../../config/queue.config')
const { PING_TIMEOUT, REFRESH_TIME } = require('../constants/constants')
const Dao = require('../../database/dao')
const Queue = require('../../modules/queue.module')
const MicrocontrollersModule = require('../../modules/microcontrollers.module')

const microsModule = new MicrocontrollersModule()
const dao = new Dao()
const queue = new Queue(QUEUE_NAME)

const GET_MICROS_TIMEOUT = REFRESH_TIME / 5

dao.connect()

const timeStringToTimestamp = timeString => new Date(timeString).getTime()

const getTemperatureMessage = (data, micro) => {
  const date = new Date()

  return {
    date: date.toUTCString(),
    digital_value: data.temperature,
    ip: micro.ip,
    measure: micro.measure,
    real_value: microsModule.digitalToReal(data.temperature, micro.sensor),
    sensor: micro.sensor,
    timestamp: date.getTime(),
    username: micro.username
  }
}

const publishTemperature = async () => {
  const micros = await microsModule.getMicrocontrollers()
  micros.forEach(async micro => {
    if (micro.isInactive) return
    try {
      const response = await axios.get(`http://${micro.ip}/temperature`, { timeout: PING_TIMEOUT })
      queue.publish(JSON.stringify(getTemperatureMessage(response.data, micro)))
    } catch (error) {
      if (micro.isInactive) return
      micro.isInactive = true
      microsModule.pingMicro(micro)
    }
  })
}

setInterval(publishTemperature, REFRESH_TIME)
setTimeout(microsModule.getMicrocontrollers, GET_MICROS_TIMEOUT)

module.exports = class TemperatureController {

  async getIndex(req, res) {
    const { username } = req.query
    let userMicros = await microsModule.getMicrocontrollers()
    userMicros = userMicros.filter(micro => micro.username === username)
    const responses = []
  
    for (const micro of userMicros) {
      console.log(micro.isInactive)
      if (micro.isInactive) continue
      try {
        const response = await axios.get(`http://${micro.ip}/temperature`, { timeout: PING_TIMEOUT })
        responses.push(getTemperatureMessage(response.data, micro))
      } catch (error) {
        console.log(error)
        if (micro.isInactive) continue
        micro.isInactive = true
        microsModule.pingMicro(micro)
      }
    }
  
    res.status(200).json(responses)
  }

  async getTemperatures(req, res) {
    try {
      console.log(req.query)
      let { end_date, end_timestamp, init_date, init_timestamp, ip, username } = req.query
  
      if (!init_timestamp) init_timestamp = timeStringToTimestamp(init_date)
      if (!end_timestamp) end_timestamp = timeStringToTimestamp(end_date)
  
      const docs = await dao.find(
        {
          ip,
          username,
          init_timestamp: { '$gte': init_timestamp },
          end_timestamp: { '$lte': end_timestamp }
        }
      )
      res.json(docs)
    } catch (error) {
      console.log(error)
      res.sendStatus(400)
    }
  }

  /*
  async insertTemperatures(req, res) {
    const objects = []
    const date = new Date(2020, 2, 1)
    console.log(date)

    for (let d = 1; d <= 31; d++) {
      for (let h = 0; h < 24; h++) {
        date.setHours(h)
        date.setDate(d)

        objects.push({
          end_date: new Date(date.getTime() - (-3600000)).toJSON(),
          end_timestamp: new Date(date.getTime() - (-3600000)).getTime(),
          init_date: date.toJSON(),
          init_timestamp: date.getTime(),
          ip: '192.168.1.50',
          max_value: Number((Math.random() * 7 + 24).toFixed(1)),
          mean_value: Number((Math.random() * 7 + 17).toFixed(1)),
          measure: 'temperature',
          min_value: Number((Math.random() * 7 + 10).toFixed(1)),
          n_samples: 60,
          sensor: 'Grove - Temperature',
          std_deviation: Number((Math.random() * 5).toFixed(1)),
          time_span: 3600000,
          username: 'Rocky'
        })
      }
    }
    //console.log(objects)
    //await dao.insertMany(objects)
    res.json(objects)
  }
  */

}
