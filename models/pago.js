const { Schema, model } = require('mongoose');

const PagoSchema = Schema({
    usuarioPaga:{
        type: Schema.Types.ObjectId,
        required: [true, 'userPay is required'],
        ref: 'User'
    },
    usuarioRecive:{
        type: Schema.Types.ObjectId,
        required: [true, 'userRecive is required'],
        ref: 'User'
    },
    fecha:{
        type: Date,
        default: Date.now()
    },
    estado:{
        type: String,
        default: 'PENDIENTE'
    },
    acuerdo:{
        type: Schema.Types.ObjectId,
        ref: 'Acuerdo'
    }
});

const Pago = model('Pay', PagoSchema );

module.exports = Pago;