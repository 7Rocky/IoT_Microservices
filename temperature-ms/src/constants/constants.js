module.exports = {
  ARDUINO_IP: process.env.ARDUINO_IP || 'localhost',
  B_TERMISTOR: 4275,
  DB_NAME: process.env.MONGO_DATABASE_NAME || 'iot',
  PORT: process.env.PORT || 4000,
  REFRESH_TIME: 60000
};
