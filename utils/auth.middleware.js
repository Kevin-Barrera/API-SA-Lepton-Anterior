const jwt = require ('jsonwebtoken');
require('dotenv').config();

exports.authenticateToken =(req,res,next)=>{
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({ error:
        'No se proporcionó un token de acceso'});
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if(error){
            return res.status(401).json({error:'Token Invalido'})
        }
        req.userId = decoded.userId;
        next();
    });
};