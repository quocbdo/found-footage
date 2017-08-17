var express = require('express');
var router = express.Router();
var listCtrl = require('../controllers/lists-controller');

router.get('/', listCtrl.index);

module.exports = router;