const axios = require('axios');
const { ARDUINO, REFRESH_TIME, B_TERMISTOR } = require('../constants/constants');
const Dao = require('../database/dao');

const dao = new Dao();
dao.connect('temperature');

const getIndex = (req, res) => {
  axios.get(`http://${ARDUINO}/temperature`)
    .then(response => {
      res.status(response.status)
        .json({
          date: new Date(),
          digital_value: response.data.temperature,
          real_value: digitalToReal(response.data.temperature),
          timestamp: Date.now()
        });
    })
    .catch(error => console.log(error));
};

const digitalToReal = digital => {
  return Number((1 / (Math.log(1023 / digital - 1) / B_TERMISTOR + 1 / 298.15) - 273.15).toFixed(1));
};

const getTemperatures = (req, res) => {
  dao.findAll()
    .then(docs => res.json(docs))
    .catch(error => console.log(error));
};

const getPrueba = (req, res) => {
  res.json({
    message: 'GET Prueba from other backend',
    env: process.env
  });
};

setInterval(() => {
  axios.get(`http://${ARDUINO}/temperature`)
    .then(response => {
      console.log(response.data, '=>', digitalToReal(response.data.temperature) + '', 'ºC');
      dao.saveTemperature({
        date: new Date(),
        digital_value: response.data.temperature,
        real_value: digitalToReal(response.data.temperature),
        timestamp: Date.now()
      });
    })
    .catch(error => console.log(error));
}, REFRESH_TIME);

module.exports = {
  getIndex,
  getPrueba,
  getTemperatures
};
