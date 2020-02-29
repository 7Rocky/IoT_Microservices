const mongoose = require('mongoose');
const { HOST, PASSWORD, PORT, USERNAME } = require('./config/config');
const Temperature = require('./models/Temperature');

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
    try {
      return await new Temperature(object).save();
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await Temperature.find();
    } catch (error) {
      throw error;
    }
  }

  async find(object) {
    try {
      return await Temperature.find(object);
    } catch (error) {
      throw error;
    }
  }
};
