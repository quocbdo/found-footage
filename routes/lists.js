var express = require('express');
var router = express.Router();
var listCtrl = require('../controllers/lists-controller');

router.get('/', listCtrl.index);
router.get('/:id', listCtrl.show)
router.post('/:id/comments', listCtrl.createComment)

module.exports = router;