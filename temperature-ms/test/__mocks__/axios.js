const { ORCHESTRATOR_MS } = require('../../src/app/constants/constants');

module.exports = {
  get: (url='') => {
    console.log(url);
    if (url.includes(`${ORCHESTRATOR_MS}`)) {
      return Promise.resolve({ 
        data: require('../microcontrollers.json')
      });
    } else if (url.includes('/temperature')) {
      return Promise.resolve({ 
        data: require('../temperature.json')
      });
    }
  }
};
