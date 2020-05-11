const { Router } = require('express')

const MicrocontrollersController = require('../controllers/microcontrollers.controller')

const microcontrollersController = new MicrocontrollersController()
const router = Router()

router.get('/', microcontrollersController.getMicrocontrollers)
router.get('/:measure', microcontrollersController.getMicrocontrollersFromMS)
router.post('/', microcontrollersController.postMicrocontrollers)
router.put('/', microcontrollersController.putMicrocontrollers)
router.delete('/', microcontrollersController.deleteMicrocontrollers)

module.exports = router
