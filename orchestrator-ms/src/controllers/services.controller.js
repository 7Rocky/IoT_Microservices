const axios = require('axios');
const queryString = require('query-string');

const JwtModule = require('../modules/jwt.module');
const jwt = new JwtModule();

const DEFAULT_PATH = '/';

module.exports = class ServicesController {

  constructor() {

  }

  async getToConnectedService(res, service, path=DEFAULT_PATH) {
    const url = `http://${service}${path}`;
  
    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  async postToConnectedService(res, body, service, path=DEFAULT_PATH) {
    const url = `http://${service}${path}`;
  
    try {
      const response = await axios.post(url, queryString.stringify(body));
  
      if (response.data) {
        const token = await jwt.generateToken({ username: body.username });
        res.json({ token });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  }

};
