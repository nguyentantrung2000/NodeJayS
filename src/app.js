require('dotenv').config();
const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const app = express();


// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
// init db
require('./dbs/init.mongodb')
const { checkOverLoad } = require('./helpers/check.connect');
// checkOverLoad();
// init routes
// app.get('/', (req, res, next) => {
//     const strCompress = "Hello NguyenTanTrung"
//     return res.status(200).json({
//         message: "Welcaome NodeJayH",
//         metadata: strCompress.repeat(10000)
//     });
// });
app.use('', require('./routers/index'))
// handle errors

module.exports = app;