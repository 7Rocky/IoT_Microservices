const axios = require('axios');

const { B_TERMISTOR, ORCHESTRATOR_MS, QUEUE_NAME, REFRESH_TIME } = require('../constants/constants');
const Dao = require('../database/dao');
const Queue = require('../modules/queue.module');

const dao = new Dao();
const queue = new Queue(QUEUE_NAME);
let microcontrollers = [];

dao.connect();

const getIndex = async (req, res) => {
  const { username } = req.query;
  const userMicros = microcontrollers.filter(micro => micro.username === username);
  console.log(userMicros);
  const responses = [];

  for (micro of userMicros) {
    try {
      const response = await axios.get(`http://${micro.ip}/temperature`);
      responses.push(getTemperatureMessage(response.data, micro));
    } catch (error) {
      console.log(error);
    }
  }

  res.status(200).json(responses);
};

const digitalToReal = (digital, sensor) => {
  switch (sensor) {
    case 'Grove - Temperature':
    case 'Fake Grove - Temperature':
      return Number((1 / (Math.log(1023 / digital - 1) / B_TERMISTOR + 1 / 298.15) - 273.15).toFixed(1));
    default:
      return Number((1 / (Math.log(1023 / digital - 1) / B_TERMISTOR + 1 / 298.15) - 273.15).toFixed(1));
  }
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

const getTemperatureMessage = (data, micro) => {
  const date = new Date();

  return {
    date: date.toUTCString(),
    digital_value: data.temperature,
    ip: micro.ip,
    measure: micro.measure,
    real_value: digitalToReal(data.temperature),
    sensor: micro.sensor,
    timestamp: date.getTime(),
    username: micro.username
  };
}

const publishTemperature = () => {
  microcontrollers.forEach(async micro => {
    try {
      const response = await axios.get(`http://${micro.ip}/${micro.measure}`);
      queue.publish(JSON.stringify(getTemperatureMessage(response.data, micro)));
    } catch (error) {
      //console.log(error);
    }
  });
};

const getMicrocontrollers = async () => {
  const response = await axios.get(`http://${ORCHESTRATOR_MS}/microcontrollers/temperature`);
  microcontrollers = response.data;
  console.log(microcontrollers);
};

setInterval(publishTemperature, REFRESH_TIME);
setTimeout(getMicrocontrollers, REFRESH_TIME / 5);

module.exports = {
  getIndex,
  getTemperatures
};
