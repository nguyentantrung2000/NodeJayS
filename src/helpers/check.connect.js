'use strict'
const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECOND_CHECK_OVERLOAD = 10000;
// count connect
const countConnect = () =>{
    const numConnection = mongoose.connections.length;
    console.log(`Number of connections: ${numConnection}`);
}
// check overload connect

const checkOverLoad = ()=>{
    setInterval(()=>{
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        //Example maximum number of connections based on the number of cores
        const maxConnections = numCores * 2;

        console.log(`Active connections: ${numConnection}`)
        console.log(`Memory usage: ${memoryUsage/1024/1024} MB`);

        if(numConnection > maxConnections){
            console.log(`Connection overload detected: ${numConnection} > ${maxConnections}`)
        }
    }, _SECOND_CHECK_OVERLOAD) ///monitor every 5 seconds   
}
module.exports = {
    countConnect,
    checkOverLoad
}