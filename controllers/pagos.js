const Acuerdo = require("../models/acuerdo");
const Pago = require("../models/pago");

const savePago = async(req,res) =>{
     
    const {usuarioPaga,usuarioRecive} = req.body;

    try {
        if( !([usuarioPaga,usuarioRecive]).includes( req.user._id.toString() ) ){
            res.status(401).json({ msg: "you can't post this pay"});
        }
        const acuerdo = Acuerdo({usuarioPaga,usuarioRecive});
        await acuerdo.save();
        const pago = Pago({usuarioPaga,usuarioRecive,acuerdo: acuerdo._id});
        await pago.save();
        res.json({ pago });
    } catch (error) {
        res.status(500).json({ error });
    }
} 

module.exports = {
    savePago
};