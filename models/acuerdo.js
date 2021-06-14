const { Schema, model } = require('mongoose');

const AcuerdoSchema = Schema({
    acuerdoUsuarioPaga:{
        type: Boolean,
        default: false,
    },
    acuerdoUsuarioRecive:{
        type: Boolean,
        default: false
    },
    fechaModificacion:{
        type: Date
    }
});

const Acuerdo = model('Pay', AcuerdoSchema );

module.exports = Acuerdo;