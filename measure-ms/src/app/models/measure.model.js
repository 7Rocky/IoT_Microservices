const Dao = require('../../database/dao')
const MicrocontrollersModule = require('../../modules/microcontrollers.module')

const timeStringToTimestamp = timeString => new Date(timeString).getTime()

const capitalizeFirstLetter = word => word[0].toUpperCase() + word.substring(1)

module.exports = class MeasureModel {

  constructor(measure) {
    this.measure = measure
    this.dao = new Dao()
    this.microsModule = new MicrocontrollersModule(measure)
    this.dao.connect()
  }

  getMessage = (data, micro) => {
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
        message.real_value = this.microsModule.digitalToReal(data[micro.measure], micro.sensor)
      case 'light':
    }
  
    return message
  }

  findMeasures = async query => {
    let { end_date, end_timestamp, init_date, init_timestamp, ip, username } = query
  
    if (!init_timestamp) init_timestamp = timeStringToTimestamp(init_date)
    if (!end_timestamp) end_timestamp = timeStringToTimestamp(end_date)

    const method = 'find' + capitalizeFirstLetter(this.measure)
    return await this.dao[method](
      {
        ip,
        username,
        init_timestamp: { '$gte': init_timestamp },
        end_timestamp: { '$lte': end_timestamp }
      }
    )
  }

}
