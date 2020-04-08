const crypto = require('crypto');

const { AUTH_MS, TEMPERATURE_MS } = require('../config/services.config');

const ServicesController = require('./services.controller');
const servicesController = new ServicesController();

const hashPassword = password => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const doAuth = async (req, res, path) => {
  const body = req.body;
  body.password = hashPassword(body.password);

  await servicesController.postToConnectedService(res, body, AUTH_MS, path);
};

module.exports = class OrchestratorController {

  constructor() {

  }

  async connectTemperatureService(req, res) {
    const { path } = req.query;
    await servicesController.getToConnectedService(res, TEMPERATURE_MS, path);
  };

  async login(req, res) {
    await doAuth(req, res, '/login');
  }

  async register(req, res) {
    await doAuth(req, res, '/register');
  }

};
