const Acuerdo = require("../models/acuerdo");
const Pago = require("../models/pago");

const savePago = async(req,res) =>{
     
    const {usuarioPaga,usuarioRecive} = req.body;

    try {
        const acuerdo = Acuerdo({usuarioPaga,usuarioRecive});
        await acuerdo.save();
        const pago = Pago({usuarioPaga,usuarioRecive,acuerdo: acuerdo._id});
        await pago.save();
        res.json({ pago });
    } catch (error) {
        res.status(500).json({ error });
    }
} 

const getPagoByUsers = async(req,res) =>{
     
    const {usuarioPaga,usuarioRecive} = req.body;

    try {
        const pagos = await Pago.find({ usuarioPaga, usuarioRecive });
        res.json({ pagos });
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    savePago,
    getPagoByUsers
};