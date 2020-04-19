const crypto = require('crypto');

const { AUTH_MS, TEMPERATURE_MS } = require('../config/services.config');
const Dao = require('../database/dao');
const ServicesController = require('./services.controller');

const dao = new Dao();
const servicesController = new ServicesController();

const hashPassword = password => {
  console.log(password);
  return crypto.createHash('sha256').update(password).digest('hex');
};

const doAuth = async (req, res, path) => {
  const body = req.body;
  console.log(body);
  body.password = hashPassword(body.password);
  await servicesController.postToConnectedService(res, body, AUTH_MS, path);
};

module.exports = class OrchestratorController {

  constructor() {

  }

  async connectTemperatureService(req, res) {
    const { path, ...query } = req.query;
    query.username = req.user.username;
    console.log(query);
    await servicesController.getToConnectedService(res, TEMPERATURE_MS, path, query);
  };

  async login(req, res) {
    await doAuth(req, res, '/login');
  }

  async register(req, res) {
    await doAuth(req, res, '/register');
    //await this.postMicrocontrollers();
  }

  // Send list of µC of a certain user to the webapp
  async getMicrocontrollers(req, res) {
    const { username } = req.user;
    return res.json(await dao.findByUsername(username));
  }

  // Send list of µC of a certain measure to the corresponding MS
  async getMicrocontrollersFromMS(req, res) {
    const { measure } = req.params;
    return res.json(await dao.findByMeasure(measure));
  }

  // User creates a new µC
  async postMicrocontrollers(req, res) {
    const microcontroller = req.body;

    try {
      const changes = await dao.insertMicrocontroller(microcontroller);

      if (changes) {
        return res.status(201).json(microcontroller);
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      return res.sendStatus(204);
    }
  }

  // User updates an existing µC
  async putMicrocontrollers(req, res) {
    const updatedMicrocontroller = req.body;

    try {
      const changes = await dao.updateMicrocontroller(updatedMicrocontroller);

      if (changes) {
        delete updatedMicrocontroller.old_ip;
        delete updatedMicrocontroller.old_measure;

        return res.status(201).json(updatedMicrocontroller);
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      return res.sendStatus(400);
    }
  }

  // User deletes an existing µC
  async deleteMicrocontrollers(req, res) {
    const microcontroller = req.body;

    try {
      const changes = await dao.deleteMicrocontroller(microcontroller);

      if (changes) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      return res.sendStatus(400);
    }
  }

};
