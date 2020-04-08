const mongoose = require('mongoose');
const { HOST, PASSWORD, PORT, USERNAME } = require('../config/mongodb.config');
const Temperature = require('./models/temperature.model');

module.exports = class MongoDB {

  constructor() {
    this.db = mongoose.connection;
  }

  connect(dbName) {
    const url = `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}`;
    const options = {
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    mongoose.connect(url, options).catch(error => console.log(error));

    this.db.once('open', () => console.log('Connection successful'));
    this.db.on('error', error => console.log(error));
  }

  async saveTemperature(object) {
    return await new Temperature(object).save();
  }

  async findAll() {
    return await Temperature.find();
  }

  async find(object) {
    return await Temperature.find(object);
  }
};
