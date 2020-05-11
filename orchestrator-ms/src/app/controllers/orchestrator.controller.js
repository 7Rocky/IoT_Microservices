const { AUTH_MS, MICROCONTROLLERS_MS, TEMPERATURE_MS } = require('../../config/services.config')
const { hashPassword } = require('../../helpers/helpers')

const JwtModule = require('../../modules/jwt.module')
const ServicesController = require('./services.controller')

const jwt = new JwtModule()
const servicesController = new ServicesController()

const doAuth = async (req, res, path) => {
  const body = req.body
  if (!body.password || !body.username) return res.sendStatus(400)

  body.password = hashPassword(body.password)
  body.refreshToken = jwt.generateRefreshToken()

  const response = await servicesController.postToConnectedService(res, AUTH_MS, path, body, null, true)
  if (!response.data) return res.sendStatus(401)

  const token = jwt.generateToken({ username: body.username })
  return res.json({ refreshToken: body.refreshToken, token })
}

module.exports = class OrchestratorController {

  async connectTemperatureService(req, res) {
    const { path, ...query } = req.query
    query.username = req.user.username
    await servicesController.getToConnectedService(res, TEMPERATURE_MS, path, query)
  }

  async login(req, res) {
    await doAuth(req, res, 'login')
  }

  async register(req, res) {
    await doAuth(req, res, 'register')
    //await this.postMicrocontrollers()
  }

  async refresh(req, res) {
    const token = jwt.getTokenFromHeaders(req.headers)
    const { refreshToken } = req.body
    const payload = jwt.getPayload(token)

    console.log(token, refreshToken, payload)

    if (!refreshToken || !token || !payload || !payload.username) return res.sendStatus(400)
    if (!jwt.isRefreshable(token)) return res.sendStatus(401)

    const newRefreshToken = jwt.generateRefreshToken()
    const { username } = payload
    const body = { newRefreshToken, refreshToken, username }
    const response = await servicesController.postToConnectedService(res, AUTH_MS, 'refresh', body, null, true)

    if (!response.data) return res.sendStatus(400)
    return res.json({
      refreshToken: newRefreshToken,
      token: jwt.generateToken({ username })
    })
  }

  // Send list of µC of a certain user to the webapp
  async getMicrocontrollers(req, res) {
    const { username } = req.user
    await servicesController.getToConnectedService(res, MICROCONTROLLERS_MS, '', { username })
  }

  // User creates a new µC
  async postMicrocontrollers(req, res) {
    const microcontroller = req.body
    await servicesController.postToConnectedService(res, MICROCONTROLLERS_MS, '', microcontroller, 201)
  }

  // User updates an existing µC
  async putMicrocontrollers(req, res) {
    const updatedMicrocontroller = req.body
    await servicesController.putToConnectedService(res, MICROCONTROLLERS_MS, '', updatedMicrocontroller, 201)
  }

  // User deletes an existing µC
  async deleteMicrocontrollers(req, res) {
    const microcontroller = req.body
    console.log(microcontroller)
    await servicesController.deleteToConnectedService(res, MICROCONTROLLERS_MS, '', microcontroller)
  }

}
