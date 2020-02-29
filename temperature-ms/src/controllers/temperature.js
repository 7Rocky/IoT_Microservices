const axios = require('axios');
const { ARDUINO, REFRESH_TIME } = require('../constants/constants');
const Dao = require('../database/dao');

const dao = new Dao();
dao.connect('temperature');

const getIndex = (req, res) => {
  axios.get(`http://${ARDUINO}${req.query.path || '/temperature'}`)
    .then(response => res.status(response.status).json(response.data))
    .catch(error => console.log(error));
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
      console.log(response.data);
      dao.saveTemperature({
        date: new Date(),
        digital_value: response.data.temperature[0],
        real_value: response.data.temperature[0],
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
