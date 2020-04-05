const axios = require('axios');
const queryString = require('query-string');

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
    const { host, password, username } = req.query;
    const query = { password, username };
    const url = `http://${host}:8080/demo/get`;

    try {
      const response = await axios.get(queryString.stringifyUrl({ url, query }));
      res.json(response.data);
    } catch (error) {
      console.log(error);
    }
  }

};
