'use strict'

const mongoose = require('mongoose');
const { db: {host, name, port} } = require('../config/config.mongodb')
const { countConnect } = require('../helpers/check.connect');
const connectString = `mongodb://${host}:${port}/${name}`


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
        mongoose.connect(connectString,{
            maxPoolSize: 50
        }).then(_ => {
            console.log(`Connected to MongoDB Success new Write`, countConnect())
        })
        .catch(err => console.log(`Connect to MongoDB Fail`));
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

