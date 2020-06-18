const axios = require('axios')

const { MICROCONTROLLERS_MS, PING_TIMEOUT } = require('../config/config')
const { getMessage } = require('../modules/message.module')

const getMicrocontrollers = async measure => {
  const response = await axios.get(`http://${MICROCONTROLLERS_MS}/${measure}`)
  return response.data
}

const requestMeasure = async micro => {
  try {
    const response = await axios.get(`http://${micro.ip}/${micro.measure}`, { timeout: PING_TIMEOUT })
    return getMessage(response.data, micro)
  } catch (error) { }
}

module.exports = { getMicrocontrollers, requestMeasure }
