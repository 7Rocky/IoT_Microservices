const { model, Schema } = require('mongoose');

module.exports = model(
  'Temperature',
  new Schema({
    end_date: Date,
    end_timestamp: Number,
    init_date: Date,
    init_timestamp: Number,
    max_value: Number,
    mean_value: Number,
    min_value: Number,
    n_samples: Number,
    sensor: String,
    std_deviation: Number,
    time_span: Number,
    username: String
  })
);
