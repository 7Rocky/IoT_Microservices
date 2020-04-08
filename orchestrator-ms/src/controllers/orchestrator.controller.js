const crypto = require('crypto');

const {
  AUTH_SERVICE_HOST,
  AUTH_SERVICE_PORT,
  TEMPERATURE_SERVICE_HOST,
  TEMPERATURE_SERVICE_PORT
} = require('../config/services.config');

const ServicesController = require('./services.controller');
const servicesController = new ServicesController();

const hashPassword = password => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const doAuth = async (req, res, path) => {
  const body = req.body;
  body.password = hashPassword(body.password);

  await servicesController.postToConnectedService(res, body, AUTH_SERVICE_HOST, path, AUTH_SERVICE_PORT);
};

module.exports = class OrchestratorController {

  constructor() {

  }

  async connectTemperatureService(req, res) {
    const { path } = req.query;
    await servicesController.getToConnectedService(res, TEMPERATURE_SERVICE_HOST, path, TEMPERATURE_SERVICE_PORT);
  };

  async login(req, res) {
    await doAuth(req, res, '/login');
  }

  async register(req, res) {
    await doAuth(req, res, '/register');
  }

};
