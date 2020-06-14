const humidities = require('../humidities.json')
const lights = require('../lights.json')
const temperatures = require('../temperatures.json')

module.exports = {
  connect: (url, options) => {
    return Promise.resolve()
  },
  model: (name, schema) => {
    return {
      find: (doc, keys) => {
        if (doc.ip && doc.username && doc.init_timestamp && doc.end_timestamp &&
            doc.init_timestamp['$gte'] && doc.end_timestamp['$lte']) {
          
          if (name === 'Humidity') {
            return Promise.resolve([ humidities[0] ])
          } else if (name === 'Light') {
            return Promise.resolve([ lights[0] ])
          } else if (name === 'Temperature') {
            return Promise.resolve([ temperatures[0] ])
          }
        }

        return Promise.resolve([ ])
      }
    }
  },
  connection: {
    on: (event, cb) => {
      cb(event)
    },
    once: (event, cb) => {
      cb(event)
    }
  },
  Schema: class {
    
    constructor(schema) {
      this.schema = schema
    }

  }
}
