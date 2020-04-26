const {
  AUTH_MS,
  TEMPERATURE_MS
} = require('../../src/config/services.config');

module.exports = {
  get: (url='') => {
    if (url.includes(`${TEMPERATURE_MS}`)) {
      return Promise.resolve({ 
        data: url.includes('temperatures') ? require('../temperature-stats.json') : require('../temperature.json')
      });
    }
  },
  post: (url='', body={ }) => {
    if (url.includes(`${AUTH_MS}/login`)) {
      return Promise.resolve({ data: body.username === 'Rocky' && body.password && body.refreshToken });
    } else if (url.includes(`${AUTH_MS}/register`)) {
      return Promise.resolve({ data: body.username !== 'Rocky' && body.password && body.refreshToken });
    } else if (url.includes(`${AUTH_MS}/refresh`)) {
      return Promise.resolve({ data: body.username === 'Rocky' && body.newRefreshToken && body.refreshToken });
    }
  }
};
