var express = require('express');
var router = express.Router();
var movieCtrl = require('../controllers/movies-controller');

router.get('/', movieCtrl.index);
router.get('/:id', movieCtrl.show);
router.post('/search', movieCtrl.search);
router.post('/', movieCtrl.create);

module.exports = router;