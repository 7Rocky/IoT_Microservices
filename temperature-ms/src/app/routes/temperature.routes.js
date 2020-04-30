const { Router } = require('express')
const TemperatureController = require('../controllers/temperature.controller')
const router = Router()
const temperatureController = new TemperatureController()

router.get('/', temperatureController.getIndex)
router.get('/temperatures', temperatureController.getTemperatures)
//router.get('/insert', temperatureController.insertTemperatures)

module.exports = router
