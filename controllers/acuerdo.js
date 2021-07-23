const Acuerdo = require("../models/acuerdo");
const Pago = require("../models/pago");

const updateAcuerdo = async( req, res ) =>{
    const {id} = req.params
    const {user} = req

    try {
        const acuerdo = await Acuerdo.findById( id )
        res.json({ acuerdo })
    } catch (error) {
        res.status(500).json({ error })
        console.log( error );
    }
}

module.exports={
    updateAcuerdo
}