const { Router } = require('express')
const router = Router()

const Controller = require('../controller/controller')
const controller = new Controller()

router.get('/humidity', controller.getHumidity)
router.get('/light', controller.getLight)
router.get('/temperature', controller.getTemperature)
router.post('/light/:status', controller.postLight)

module.exports = router
