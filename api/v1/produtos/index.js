var express = require('express');
var router = express.Router();
const produto = require('./produto')
router.use('/produtos/', produto);
 

module.exports = router;