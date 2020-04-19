const { Router } = require('express');
const { getIndex, getTemperatures, insertTemperatures } = require('../controllers/temperature.controller');
const router = Router();

router.get('/', getIndex);
router.get('/temperatures', getTemperatures);
router.get('/insert', insertTemperatures);

module.exports = router;
