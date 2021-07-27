const { Router } = require('express');
const { check } = require('express-validator');
const { savePago, getPagoByUser, getPago, updateAcuerdo, savePagoWithEmail } = require('../controllers/pagos');
const { payExists } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { verifyUserPay } = require('../middlewares/verify-user');
const router = Router()

router.post('/',[
    validateJWT,
    verifyUserPay,
    validateFields
], savePago)

router.post('/email',[
    validateJWT
], savePagoWithEmail)

router.get('/',[
    validateJWT,
    validateFields
], getPagoByUser);

router.get('/:id',[
    validateJWT,
    check('id').isMongoId(),
    validateFields
], getPago);

router.put('/:id',[
    validateJWT,
    check('id').isMongoId(),
    check('id').custom( payExists ),
    validateFields
], updateAcuerdo);

module.exports = router