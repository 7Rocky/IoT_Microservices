const jwt = require('jsonwebtoken')
const randToken = require('rand-token') 

const {
  MAX_EXPIRATION_TIME,
  REFRESH_TOKEN_LENGTH,
  TOKEN_SECRET,
  TOKEN_EXPIRATION_TIME
} = require('../config/jwt.config')

const getCurrentExpirationTime = () => {
  return Number((Date.now() / 1000 - MAX_EXPIRATION_TIME).toFixed())
}

module.exports = class JwtModule {

  generateRefreshToken() {
    return randToken.uid(REFRESH_TOKEN_LENGTH)
  }

  generateToken(payload) {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION_TIME })
  }

  getPayload(token) {
    if (!token) return { }
    return jwt.decode(token)
  }

  getTokenFromHeaders(headers) {
    if (!headers.authorization) return ''
    return headers.authorization.substring(7)
  }

  isRefreshable(token) {
    const payload = this.getPayload(token)
    return payload.iat > getCurrentExpirationTime()
  }

}
