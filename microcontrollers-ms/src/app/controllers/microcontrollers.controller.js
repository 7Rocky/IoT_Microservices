const NodeCache = require('node-cache')

const { isValidMicrocontroller } = require('../../helpers/helpers')
const Dao = require('../../database/dao')

const cache = new NodeCache()
const dao = new Dao()

module.exports = class OrchestratorController {

  async getMicrocontrollers(req, res) {
    const { username } = req.query

    let response = cache.get(`/?username=${username}`)
    if (response) return res.status(200).json(response)

    response = await dao.findByUsername(username)
    if (response.length) cache.set(`/?username=${username}`, response)
    return res.status(200).json(response)
  }

  async getMicrocontrollersFromMS(req, res) {
    const { measure } = req.params

    let response = cache.get(`/${measure}`)
    if (response) return res.status(200).json(response)

    response = await dao.findByMeasure(measure)
    if (response.length) cache.set(`/${measure}`, response)
    return res.status(200).json(response)
  }

  async postMicrocontrollers(req, res) {
    const microcontroller = req.body

    if (!isValidMicrocontroller(microcontroller)) return res.sendStatus(400)

    cache.del([ `/?username=${microcontroller.username}`, `/${microcontroller.measure}` ])

    try {
      const changes = await dao.insertMicrocontroller(microcontroller)
      if (!changes) return res.sendStatus(204)

      return res.status(201).json(microcontroller)
    } catch (error) {
      return res.sendStatus(400)
    }
  }

  async putMicrocontrollers(req, res) {
    const updatedMicrocontroller = req.body
    const { old_ip, ...micro } = updatedMicrocontroller

    if (!isValidMicrocontroller(micro) || !old_ip) return res.sendStatus(400)

    cache.del([ `/?username=${micro.username}`, `/${micro.measure}` ])

    try {
      const changes = await dao.updateMicrocontroller(updatedMicrocontroller)
      if (!changes) return res.sendStatus(404)

      delete updatedMicrocontroller.old_ip
      return res.status(201).json(updatedMicrocontroller)
    } catch (error) {
      return res.sendStatus(400)
    }
  }

  async deleteMicrocontrollers(req, res) {
    const microcontroller = req.body
    try {
      const changes = await dao.deleteMicrocontroller(microcontroller)
      if (!changes) return res.sendStatus(404)

      cache.del([ `/?username=${microcontroller.username}`, `/${microcontroller.measure}` ])

      return res.sendStatus(200)
    } catch (error) {
      return res.sendStatus(400)
    }
  }

}
