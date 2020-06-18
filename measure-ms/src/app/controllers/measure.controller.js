const axios = require('axios')

const { PING_TIMEOUT, REFRESH_TIME } = require('../constants/constants')
const MicrocontrollersModule = require('../../modules/microcontrollers.module')
const MeasureModel = require('../models/measure.model')

const GET_MICROS_TIMEOUT = REFRESH_TIME / 5

module.exports = class MeasureController {

  constructor(measure) {
    this.measure = measure
    this.microsModule = new MicrocontrollersModule(measure)
    this.measureModel = new MeasureModel(measure)
    
    setTimeout(this.microsModule.getMicrocontrollers, GET_MICROS_TIMEOUT)
  }

  getMeasure = async (req, res) => {
    const { username } = req.query
    let userMicros = await this.microsModule.getMicrocontrollers()
    userMicros = userMicros.filter(micro => micro.username === username)
    const responses = await Promise.all(userMicros.map(this.requestMeasure))
    res.status(200).json(responses)
  }

  requestMeasure = async micro => {
    try {
      const response = await axios.get(`http://${micro.ip}/${micro.measure}`, { timeout: PING_TIMEOUT })
      return this.measureModel.getMessage(response.data, micro)
    } catch (error) {
      return
    }
  }

  getMeasures = async (req, res) => {
    try {
      res.status(200).json(await this.measureModel.findMeasures(req.query))
    } catch (error) {
      res.sendStatus(400)
    }
  }

  postLight = async (req, res) => {
    if (this.measure === 'light') {
      const { ip, status, username } = req.body
      const userMicros = await this.microsModule.getMicrocontrollers()
      const micros = userMicros.filter(micro => micro.username === username && micro.ip === ip)

      if (micros.length === 1) {
        try {
          const response = await axios.post(`http://${ip}/light/${status}`, { }, { timeout: PING_TIMEOUT })
          return res.status(200).json(this.measureModel.getMessage(response.data, micros[0]))
        } catch (error) { }
      }
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
