var express = require('express');
var router = express.Router();
var usersListCtrl = require('../controllers/usersLists-controller')

router.get('/', usersListCtrl.index);
router.get('/new', usersListCtrl.new);
router.get('/:id', usersListCtrl.show);
router.post('/', usersListCtrl.create);
router.put('/:id', usersListCtrl.update);
router.delete('/:id', usersListCtrl.delete);

module.exports = router;