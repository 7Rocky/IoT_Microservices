module.exports = {
  B_TERMISTOR: 4275,
  ORCHESTRATOR_MS: process.env.ORCHESTRATOR_MS_HOSTNAME || 'localhost:3000',
  PORT: process.env.PORT || 4000,
  QUEUE_NAME: process.env.QUEUE_NAME_TEMPERATURE || 'temperatures',
  REFRESH_TIME: 60000
};
