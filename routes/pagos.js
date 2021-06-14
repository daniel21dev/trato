const { Router } = require('express');
const { check } = require('express-validator');
const { savePago, getPagoByUsers } = require('../controllers/pagos');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { verifyUserPay } = require('../middlewares/verify-user');
const router = Router()

router.post('/',[
    validateJWT,
    verifyUserPay,
    validateFields
], savePago)

// pendiente
router.get('/',[
    validateJWT,
    verifyUserPay,
    validateFields
], getPagoByUsers);


module.exports = router