var express = require('express');
var router = express.Router();
var listCtrl = require('../controllers/usersLists-controller')

router.get('/', listCtrl.index);

module.exports = router;