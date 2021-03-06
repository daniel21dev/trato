const Acuerdo = require("../models/acuerdo");
const Pago = require("../models/pago");
const User = require("../models/user");

const savePago = async(req,res) =>{
     
    const {usuarioPaga,usuarioRecive} = req.body;

    try {
        // create and save deal
        const acuerdo = Acuerdo({});
        await acuerdo.save();
        // create and save pay
        const pago = Pago({
            usuarioPaga,
            usuarioRecive,
            acuerdo: acuerdo._id,
            usuarioCreo: req.user 
        });
        await pago.save();

        res.json({ pago });
    } catch (error) {
        res.status(500).json({ error });
    }
} 

const savePagoWithEmail = async(req,res) =>{
     
    const {usuarioPaga,usuarioRecive} = req.body;
    const { user } = req

    if( usuarioPaga === user.email || usuarioRecive === user.email ){
        res.status(401).json({ msg: 'no puedes pagarte a ti mismo!'})
    }

    try {
        if( usuarioPaga ){
            // check if user exists
            const otherUser = await User.findOne({ email: usuarioPaga })
            if( !otherUser || !otherUser.active ){
                return res.status(400).json({ msg: `The user whit email ${ usuarioPaga } does not exists`})
            }
            // create and save deal
            const acuerdo = Acuerdo({});
            await acuerdo.save();
            // create and save pay
            const pago = Pago({
                usuarioPaga: otherUser.id,
                usuarioRecive: user.id,
                acuerdo: acuerdo._id,
                usuarioCreo: req.user 
            });
            // save and return pay
            await pago.save();
            res.json({ pago });
        }else{
            // check if user exists
            const otherUser = User.findOne({ email: usuarioRecive })
            if( !otherUser || !otherUser.active ){
                return res.status(400).json({ msg: `The user whit email ${ usuarioRecive } does not exists`})
            }
            // create and save deal
            const acuerdo = Acuerdo({});
            await acuerdo.save();
            // create and save pay
            const pago = Pago({
                usuarioPaga: user.id,
                usuarioRecive: otherUser.id ,
                acuerdo: acuerdo._id,
                usuarioCreo: user.id 
            });
            // save and return pay
            await pago.save();
            res.json({ pago });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
} 

const getPagoByUser = async(req,res) =>{

    try {
        const pagos = await Pago.find({
            $or: [
                { usuarioPaga: req.user.id },
                { usuarioRecive: req.user.id  }
            ]
        }).sort({ fecha: -1 })

        res.json({ pagos });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getPago = async(req,res) =>{

    const { id } = req.params

    try {
        // find pay
        const pago = await Pago.findById( id )
        const acuerdo = await Acuerdo.findById( pago.acuerdo )
        // verify ownership of pay
        if( ![pago.usuarioPaga.toString(), pago.usuarioRecive.toString()].includes( req.user.id.toString() )  ){
            console.log([pago.usuarioPaga, pago.usuarioRecive], req.user.id);
            return res.status(401).json({ msg: `Acces denied`})
        }
        res.json({ pago, acuerdo });
    } catch (error) {
        res.status(500).json({ error });
        console.log( error );
    }
}

const updateAcuerdo = async( req, res ) =>{
    const {id} = req.params
    const {user} = req

    try {
        // find pay
        const pago = await Pago.findById( id )
        const acuerdo = await Acuerdo.findById( pago.acuerdo )
        // update
        if( pago.usuarioPaga.toString() === user.id.toString() ){
            acuerdo.acuerdoUsuarioPaga = !acuerdo.acuerdoUsuarioPaga
        }else if( pago.usuarioRecive.toString() === user.id.toString() ){
            acuerdo.acuerdoUsuarioRecive = !acuerdo.acuerdoUsuarioRecive
        }else{
            return res.status(401).json({ msg: 'Nop'})
        }
        
        await acuerdo.save()

        if( acuerdo.acuerdoUsuarioPaga && acuerdo.acuerdoUsuarioRecive ){
            return res.json({ msg: 'El pago sera realizado' })
        }
        res.json({ acuerdo })
    } catch (error) {
        res.status(500).json({ error })
        console.log( error );
    }
}
module.exports = {
    savePago,
    savePagoWithEmail,
    getPagoByUser,
    getPago,
    updateAcuerdo
};