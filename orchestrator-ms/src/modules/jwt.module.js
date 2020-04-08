const jwt = require('json-web-token');

const TOKEN_SECRET = 'secret';
const TOKEN_EXPIRATION_TIME = 3600000; // 1 h

const getToken = req => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    return authHeader.split(' ')[1];
  }
};

module.exports = class JwtModule {

  constructor() {

  }

  verifyToken(req, res, next) {
    const token = getToken(req);

    if (token) {
      return jwt.decode(TOKEN_SECRET, token, (error, payload) => {
        return !error && Date.now() < payload.exp ? next() : res.sendStatus(401);
      });
    }

    return res.sendStatus(401);
  }

  async generateToken(payload) {
    payload.iat = Date.now();
    payload.exp = payload.iat + TOKEN_EXPIRATION_TIME;

    const result = await jwt.encode(TOKEN_SECRET, payload);

    return result.value;
  }

};
