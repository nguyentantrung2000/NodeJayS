'use strict'
const JWT = require('jsonwebtoken');

const createTokenPair = async (payload, publicKey, privateKey) =>{
    try{
        // access Token
        const accessToken = await JWT.sign(payload, privateKey,{
            expiresIn: '2 days'
        })
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        })
        // 
        JWT.verify(accessToken, publicKey, (error, decoded)=>{
            if(error){
                console.log('error verify:::', error)
            }else{
                console.log('decoded:::', decoded)
            }
        });
        return { accessToken, refreshToken }
    }catch(error){
        return error;
    }
}   

module.exports = {
    createTokenPair,
}