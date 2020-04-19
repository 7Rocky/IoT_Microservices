const mongoose = require('mongoose');

const { DB_NAME, MONGO, PASSWORD, USERNAME } = require('../config/mongodb.config');
const Temperature = require('./models/temperature.model');

module.exports = class MongoDB {

  constructor() {
    this.db = mongoose.connection;
  }

  connect() {
    const url = `mongodb://${USERNAME}:${PASSWORD}@${MONGO}`;
    const options = {
      dbName: DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    mongoose.connect(url, options).catch(error => console.log(error));

    this.db.once('open', () => console.log('Connection successful'));
    this.db.on('error', error => console.log(error));
  }

  async findAll() {
    return await Temperature.find({ }, { _id: 0, __v: 0 });
  }

  async find(object) {
    return await Temperature.find(object, { _id: 0, __v: 0 });
  }

  async insertMany(objects) {
    return await Temperature.insertMany(objects);
  }

};
