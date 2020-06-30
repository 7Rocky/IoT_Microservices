const { Router } = require('express')

const MeasureController = require('../controllers/measure.controller')

const router = Router()
const humidityController = new MeasureController('humidity')
const lightController = new MeasureController('light')
const temperatureController = new MeasureController('temperature')

router.get('/humidity', humidityController.getMeasure)
router.get('/humidities', humidityController.getMeasures)

router.get('/light', lightController.getMeasure)
router.get('/lights', lightController.getMeasures)
router.post('/light', lightController.postLight)

router.get('/temperature', temperatureController.getMeasure)
router.get('/temperatures', temperatureController.getMeasures)

module.exports = router
