'use strict'

const shopModel = require("../models/shop.model")
const bycrypt = require('bcrypt')
const crypto = require('crypto')
const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}
class AccessService{
 static signUp = async ({name, email, password}) =>{
    try{
        // check email exist
        const holderShop = await shopModel.findOne({email}).lean()
        if(holderShop){
            return {
                code: 'xxxx',
                message: 'Email exist',
            }
        }
        const passwordHash = await bycrypt.hash(password, 10)
        const newShop = await shopModel.created({
            name,
            email, 
            password: passwordHash, 
            roles: [RoleShop.SHOP]
        })
        if(newShop){
            // created privateKey, publicKey
            const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa',{
                modulusLength: 4096,
            })
            // console.log({privateKey, publicKey}) save collection keyStore
        }
    }catch(err){
        return {
            code: 'xxx',
            message: err.message,
            status: 'error'
        }
    }
 }
}
module.exports = AccessService