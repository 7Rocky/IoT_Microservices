const axios = require('axios');

const { ARDUINO_IP, B_TERMISTOR, DB_NAME, REFRESH_TIME } = require('../constants/constants');
const Dao = require('../database/dao');
const Queue = require('../modules/queue.module');

const USERNAME = 'Rocky';
const SENSOR = 'Grove - Temperature';
const dao = new Dao();
const queue = new Queue('temperature');

dao.connect(DB_NAME);

const getIndex = async (req, res) => {
  try {
    const response = await axios.get(`http://${ARDUINO_IP}/temperature`);
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
    for (doc of docs) {
      delete doc._id;
    }
    res.json(docs);
  } catch (error) {
    console.log(error);
  }
};

const publishTemperature = async () => {
  try {
    const response = await axios.get(`http://${ARDUINO_IP}/temperature`);
    const temperature_message = {
      date: new Date().toUTCString(),
      digital_value: response.data.temperature,
      real_value: digitalToReal(response.data.temperature),
      sensor: SENSOR,
      timestamp: Date.now(),
      username: USERNAME
    };

    queue.publish(JSON.stringify(temperature_message));
  } catch (error) {
    console.log(error);
  }
};

setInterval(publishTemperature, REFRESH_TIME);

module.exports = {
  getIndex,
  getTemperatures
};
