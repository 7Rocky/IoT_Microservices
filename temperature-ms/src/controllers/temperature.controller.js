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
  //console.log(userMicros);
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
    //const docs = await dao.findAll();
    console.log(req.query);
    let { end_date, end_timestamp, init_date, init_timestamp, ip, username } = req.query;

    if (!init_timestamp) {
      init_timestamp = new Date(init_date).getTime();
    }

    if (!end_timestamp) {
      end_timestamp = new Date(end_date).getTime();
    }

    console.log(init_timestamp, end_timestamp);

    const docs = await dao.find(
      {
        ip,
        username,
        init_timestamp: { '$gte': init_timestamp },
        end_timestamp: { '$lte': end_timestamp }
      }
    );

    res.json(docs);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
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

const insertTemperatures = async (req, res) => {
  const objects = [];
  const date = new Date(2020, 2, 1);
  console.log(date);

  for (let d = 1; d <= 31; d++) {
    for (let h = 0; h < 24; h++) {
      date.setHours(h);
      date.setDate(d);

      objects.push({
        end_date: new Date(date.getTime() - (-3600000)).toJSON(),
        end_timestamp: new Date(date.getTime() - (-3600000)).getTime(),
        init_date: date.toJSON(),
        init_timestamp: date.getTime(),
        ip: '192.168.1.50',
        max_value: Number((Math.random() * 7 + 24).toFixed(1)),
        mean_value: Number((Math.random() * 7 + 17).toFixed(1)),
        measure: 'temperature',
        min_value: Number((Math.random() * 7 + 10).toFixed(1)),
        n_samples: 60,
        sensor: 'Grove - Temperature',
        std_deviation: Number((Math.random() * 5).toFixed(1)),
        time_span: 3600000,
        username: 'Rocky'
      });
    }
  }
  //console.log(objects);
  //await dao.insertMany(objects);
  res.json(objects);
};

module.exports = {
  getIndex,
  getTemperatures,
  insertTemperatures
};
