const { isValidMicrocontroller } = require('../../helpers/helpers')

const Dao = require('../../database/dao')
const dao = new Dao()

module.exports = class OrchestratorController {

  // Send list of µC of a certain user to the webapp
  async getMicrocontrollers(req, res) {
    const { username } = req.query
    return res.json(await dao.findByUsername(username))
  }

  // Send list of µC of a certain measure to the corresponding MS
  async getMicrocontrollersFromMS(req, res) {
    const { measure } = req.params
    return res.json(await dao.findByMeasure(measure))
  }

  // User creates a new µC
  async postMicrocontrollers(req, res) {
    const microcontroller = req.body

    if (!isValidMicrocontroller(microcontroller)) return res.sendStatus(400)

    try {
      const changes = await dao.insertMicrocontroller(microcontroller)
      if (!changes) return res.sendStatus(204)

      return res.status(201).json(microcontroller)
    } catch (error) {
      return res.sendStatus(400)
    }
  }

  // User updates an existing µC
  async putMicrocontrollers(req, res) {
    console.log('put', req.body)
    const updatedMicrocontroller = req.body
    const { old_ip, old_measure, ...micro } = updatedMicrocontroller

    if (!isValidMicrocontroller(micro) || !old_ip || !old_measure) return res.sendStatus(400)

    try {
      const changes = await dao.updateMicrocontroller(updatedMicrocontroller)
      if (!changes) return res.sendStatus(404)

      delete updatedMicrocontroller.old_ip
      delete updatedMicrocontroller.old_measure
      return res.status(201).json(updatedMicrocontroller)
    } catch (error) {
      return res.sendStatus(400)
    }
  }

  // User deletes an existing µC
  async deleteMicrocontrollers(req, res) {
    const microcontroller = req.body

    try {
      console.log(microcontroller)
      const changes = await dao.deleteMicrocontroller(microcontroller)
      if (!changes) return res.sendStatus(404)

      return res.sendStatus(200)
    } catch (error) {
      return res.sendStatus(400)
    }
  }

}
