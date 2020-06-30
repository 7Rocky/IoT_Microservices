const axios = require('axios')

const { PING_TIMEOUT } = require('../constants/constants')
const MicrocontrollersModule = require('../../modules/microcontrollers.module')
const MeasureModel = require('../models/measure.model')

module.exports = class MeasureController {

  constructor(measure) {
    this.measure = measure
    this.microsModule = new MicrocontrollersModule(measure)
    this.measureModel = new MeasureModel(measure)
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

}
