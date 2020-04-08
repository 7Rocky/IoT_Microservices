module.exports = {
  HOST: process.env.MONGO_HOSTNAME || '192.168.99.100',
  PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD || 'secret',
  PORT: process.env.MONGO_SERVICE_PORT || 32000,
  USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME || 'root'
};
