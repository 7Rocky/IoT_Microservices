const axios = require('axios');
const { ARDUINO, REFRESH_TIME, B_TERMISTOR } = require('../constants/constants');
const Dao = require('../database/dao');

const dao = new Dao();
dao.connect('temperature');

const getIndex = async (req, res) => {
  try {
    const response = await axios.get(`http://${ARDUINO}/temperature`);
    res.status(response.status)
      .json({
        date: new Date().toUTCString(),
        digital_value: response.data.temperature,
        real_value: digitalToReal(response.data.temperature),
        timestamp: Date.now()
      });
  } catch (error) {
    console.log(error);
  }
};

const digitalToReal = digital => {
  return Number((1 / (Math.log(1023 / digital - 1) / B_TERMISTOR + 1 / 298.15) - 273.15).toFixed(1));
};

const getTemperatures = async (req, res) => {
  try {
    const docs = await dao.findAll();
    res.json(docs);
  } catch (error) {
    console.log(error);
  }
};

const getPrueba = (req, res) => {
  res.json({
    message: 'GET Prueba from other backend',
    env: process.env
  });
};

const saveTemperature = async () => {
  try {
    const response = await axios.get(`http://${ARDUINO}/temperature`);
    const temperature = response.data.temperature;

    console.log(`${temperature} => ${digitalToReal(temperature)} ºC`);

    dao.saveTemperature({
      date: new Date(),
      digital_value: temperature,
      real_value: digitalToReal(temperature),
      timestamp: Date.now()
    });
  } catch (error) {
    console.log(error);
  }
};

setInterval(saveTemperature, REFRESH_TIME);

module.exports = {
  getIndex,
  getPrueba,
  getTemperatures
};
