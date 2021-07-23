const Pago = require('../models/pago');
const User = require('../models/user');

const emailExists = async( email ) =>{
    const userExists = await User.findOne({ email });
    if( userExists ){
        throw new Error(`the email ${ email } is already registered`);
    }
}

const userNameExists = async( userName ) =>{
    const userExists = await User.findOne({ userName });
    if( userExists ){
        throw new Error(`the userName ${ userName } is already registered`);
    }
}

// Pays
const payExists = async( id ) =>{
    const payExists = await Pago.findById( id )
    if( !payExists ){
        throw new Error(`the pay does not exists`);
    }
}

const enumEstados = ['PENDIENTE','CANCELADO','COMPLETADO']
const estadoOpcionValida = async( estado ) =>{
    if( !enumEstados.includes( estado ) ){
        throw new Error(`the state ${ estado } is not valid!`);
    }
}
module.exports = {
    emailExists,
    userNameExists,
    payExists
}