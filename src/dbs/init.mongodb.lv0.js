'use strict'

const mongoose = require('mongoose');

const connectString = `mongodb+srv://trungtan0:admin123@nodejayh.v9bvg84.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(connectString).then(_ => console.log(`Connected to MongoDB Success`)).catch(err => console.log(`Connect to MongoDB Fail`));

// dev
if( 1 === 1){
    mongoose.set('debug', true);
    mongoose.set('debug', {color: true})
}

module.exports = mongoose;