module.exports = {
  HOST: process.env.MONGO_SERVICE_HOST ? 'mongo' : '192.168.99.100',
  PORT: process.env.MONGO_SERVICE_PORT || 32000,
  USERNAME: 'root',
  PASSWORD: 'secret'
};
