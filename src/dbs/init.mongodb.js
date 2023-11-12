'use strict'

const mongoose = require('mongoose');
const { db: {host, name, port} } = require('../config/config.mongodb')
const { countConnect } = require('../helpers/check.connect');
// const connectString = `mongodb://${host}:${port}/${name}`
const connectString = `mongodb+srv://trungtan0:lPXRWMDyvijP9seE@nodejayh.v9bvg84.mongodb.net/?retryWrites=true&w=majority`


console.log(connectString)
class Database{
    constructor(){
        this.connect();
    }
    connect(type = 'mongodb'){
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true })
        }
        mongoose.connect(connectString).then(_ => console.log('connect mongodb success PRO')).catch(err => console.log(err));
    }
    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
const instanceMogoDB = Database.getInstance();

module.exports = instanceMogoDB;

