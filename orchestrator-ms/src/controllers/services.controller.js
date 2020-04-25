const axios = require('axios');
const queryString = require('query-string');

module.exports = class ServicesController {

  async getToConnectedService(res, service, path='', query={ }) {
    const url = `http://${service}/${path}?${queryString.stringify(query)}`;

    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async postToConnectedService(res, body, service, path='/') {
    const url = `http://${service}${path}`;
  
    try {
      return await axios.post(url, body);
    } catch (error) {
      console.log(error);
      res.sendStatus(401);
    }
  }

};
