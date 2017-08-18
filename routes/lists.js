var express = require('express');
var router = express.Router();
var listCtrl = require('../controllers/lists-controller');

router.get('/', listCtrl.index);
router.post('/', listCtrl.filter);
router.get('/:id', listCtrl.show);
router.post('/:id/comments', listCtrl.createComment);
router.delete('/:id/comments/:commentId', listCtrl.deleteComment);

module.exports = router;