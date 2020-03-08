const axios = require('axios');
const { ARDUINO, REFRESH_TIME } = require('../constants/constants');
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

const digitalToReal = digital => Number((digital / 10  - 25).toFixed(1));

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
      console.log(response.data);
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
