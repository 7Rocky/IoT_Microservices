const mongoose = require('mongoose')

const { DB_NAME, MONGO, PASSWORD, USERNAME } = require('../config/mongodb.config')
const Humidity = require('./models/humidity.model')
const Light = require('./models/light.model')
const Temperature = require('./models/temperature.model')

module.exports = class MongoDB {

  constructor() {
    this.db = mongoose.connection
  }

  connect() {
    const url = `mongodb://${USERNAME}:${PASSWORD}@${MONGO}`
    const options = {
      dbName: DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }

    mongoose.connect(url, options).catch(error => console.log(error))

    this.db.once('open', () => console.log('Connection successful'))
    this.db.on('error', error => console.log(error))
  }

  async findHumidity(humidity) {
    return await Humidity.find(humidity, { _id: 0, __v: 0 })
  }

  async findLight(light) {
    return await Light.find(light, { _id: 0, __v: 0 })
  }

  async findTemperature(temperature) {
    return await Temperature.find(temperature, { _id: 0, __v: 0 })
  }

}
