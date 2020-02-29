const { model, Schema } = require('mongoose');

module.exports = model(
  'Temperature',
  new Schema({
    date: Date,
    digital_value: Number,
    real_value: Number,
    timestamp: {
      default: Date.now(),
      type: Number
    }
  })
);
