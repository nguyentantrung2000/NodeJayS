'use strict'

const mongoose = require('mongoose');
const { countConnect } = require('../helpers/check.connect');
const connectString = `mongodb+srv://trungtan0:admin123@nodejayh.v9bvg84.mongodb.net/?retryWrites=true&w=majority`

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

