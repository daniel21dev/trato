const { Router } = require('express');
const { check } = require('express-validator');
const { savePago } = require('../controllers/pagos');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router()

router.post('/',[
    validateJWT,
    validateFields
], savePago)


module.exports = router