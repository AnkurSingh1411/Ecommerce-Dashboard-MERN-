const Jwt = require('jsonwebtoken');
require('dotenv').config();
const JwtKey = process.env.JwtKey
console.log("kns",JwtKey)

function verifyToken (req,res,next){
    const token = req.headers['authorization'];
    if (token){
    let tokenToVerify =  token.split(' ')[1]
    console.warn("Authorization is =====",tokenToVerify)
        Jwt.verify(tokenToVerify, JwtKey, (err,result)=>{
            if (err){
                res.status(401).send({
                    message : "token is not valid ",
                    error : err.message
                })
            }
            else {
                next()
            }
        })

    }
    else {
        res.status(403).send({
            message : "Please add token in the headers "
        })
    }
}


module.exports = {verifyToken}