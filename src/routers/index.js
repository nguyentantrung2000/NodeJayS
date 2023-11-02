'use strict'

const express = require('express');
const router = express.Router();

router.use('/v1/api', require('./access/index'))
// router.get('', (req, res, next) => {
//         const strCompress = "Hello NguyenTanTrung"
//         return res.status(200).json({
//             message: "Welcome NodeJayH",
//         });
//     });

module.exports = router;