// this verify if is the same user who are making changes

const verifyUser = ( req, res, next ) =>{
    const {id} = req.params; 

    if( id !== req.user.id ){
        return res.status(401).json({
            msg: 'you dont own the account'
        });
    }
    next();
}

const verifyUserPay = ( req, res, next ) =>{
    const {usuarioPaga,usuarioRecive} = req.body;

    if( !([usuarioPaga,usuarioRecive]).includes( req.user._id.toString() ) ){
        return res.status(401).json({ msg: "you can't post this pay"});
    }
    next();
}

module.exports = {
    verifyUser,
    verifyUserPay
}