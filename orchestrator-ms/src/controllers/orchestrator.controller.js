const axios = require('axios');
const crypto = require('crypto');
const queryString = require('query-string');

const JwtModule = require('../modules/jwt.module');
const jwt = new JwtModule();

const AUTH_SERVICE = process.env.AUTH_MS_HOST || 'localhost';

const hashPassword = password => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

module.exports = class OrchestratorController {

  constructor() {

  }

  async getIndex(req, res) {
    const { host, path, port } = req.query;
    const url = `http://${host}:${port || 80}${path || '/'}`;

    console.log(url);

    if (host) {
      try {
        const response = await axios.get(url);
        res.json(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      res.json({ message: 'No host provided', env: process.env });
    }
  };

  async login(req, res) {
    const url = `http://${AUTH_SERVICE}:8080/login`;
    const query = req.body;
    query.password = hashPassword(query.password);

    console.log(query);

    try {
      const response = await axios.post(url, queryString.stringify(query));

      if (response.data) {
        const token = await jwt.generateToken({ username: query.username });
        res.json({ token });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async register(req, res) {
    const url = `http://${AUTH_SERVICE}:8080/register`;
    const query = req.body;
    query.password = hashPassword(query.password);

    console.log(query);

    try {
      const response = await axios.post(url, queryString.stringify(query));

      if (response.data) {
        const token = await jwt.generateToken({ username: query.username });
        res.json({ token });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  }

};
