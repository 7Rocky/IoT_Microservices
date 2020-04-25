const jwt = require('jsonwebtoken');
const randToken = require('rand-token') 

const { TOKEN_SECRET, TOKEN_EXPIRATION_TIME } = require('../config/jwt.config');

module.exports = class JwtModule {

  generateRefreshToken() {
    return randToken.uid(256);
  }

  generateToken(payload) {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION_TIME });
  }

  getPayload(token) {
    return jwt.decode(token);
  }

};
