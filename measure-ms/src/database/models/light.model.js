const { model, Schema } = require('mongoose')

module.exports = model(
  'Light',
  new Schema({
    digital_values: Array,
    end_date: Date,
    end_timestamp: Number,
    init_date: Date,
    init_timestamp: Number,
    ip: String,
    mean_value: Number,
    measure: String,
    n_samples: Number,
    sensor: String,
    time_span: Number,
    username: String
  })
)
