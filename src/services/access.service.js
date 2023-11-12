'use strict'

const shopModel = require("../models/shop.model")
const bycrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require("./keyToken.service")
const { createTokenPair } = require("../auth/authUtils")
const { getInfoData } = require("../utils")
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
        const newShop = await shopModel.create({
            name,
            email, 
            password: passwordHash, 
            roles: [RoleShop.SHOP]
        })
        if(newShop){
            // created privateKey, publicKey
            const privateKey =crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')

            // public key crypto standards
            console.log({privateKey, publicKey}) 

            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey,
            })

            if (!keyStore){
                return {
                    code: 'xxxx',
                    message: 'keyStore Error',
                }
            }
            // ceeate token pair
            const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)
            console.log(`Created Token Success:::`, tokens)

            return {
                code: 201,
                metadata:{
                    shop: getInfoData({ fileds: ['_id', 'name', 'email', 'roles'], object: newShop}),
                    tokens,
                }
            }
        }
        return {
            code: 200,
            metadata: null
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