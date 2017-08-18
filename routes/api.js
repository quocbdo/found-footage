var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/api-controller');

router.get('/lists', apiCtrl.index);
router.get('/lists/:id', apiCtrl.show);

module.exports = router;