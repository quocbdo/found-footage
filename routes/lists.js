var express = require('express');
var router = express.Router();
var listCtrl = require('../controllers/usersLists-controller')

router.get('users/:id/list/:id', listCtrl.show)

module.exports = router;