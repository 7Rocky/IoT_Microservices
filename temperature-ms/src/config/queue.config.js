module.exports = {
  HOST: process.env.RABBITMQ_HOSTNAME || '192.168.99.100',
  PASSWORD: process.env.RABBITMQ_DEFAULT_PASS || 'password',
  PORT: process.env.RABBITMQ_SERVICE_PORT || 31300,
  USERNAME: process.env.RABBITMQ_DEFAULT_USER || 'user',
};
