const jwt = require('jsonwebtoken');

const { TOKEN_SECRET, TOKEN_EXPIRATION_TIME } = require('../config/jwt.config');

module.exports = class JwtModule {

  generateToken(payload) {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION_TIME });
  }

};
