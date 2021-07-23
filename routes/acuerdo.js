const { Router } = require('express')
const { check } = require('express-validator')
const { updateAcuerdo } = require('../controllers/acuerdo')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')
const router = Router()

router.put('/:id',[
    validateJWT,
    check('id').isMongoId(),
    validateFields
], updateAcuerdo)


module.exports = router