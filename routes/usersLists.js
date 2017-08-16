var express = require('express');
var router = express.Router();
var usersListCtrl = require('../controllers/usersLists-controller')

router.get('/', usersListCtrl.index);
router.get('/new', usersListCtrl.new);
router.get('/:id', usersListCtrl.show);
router.get('/:id', usersListCtrl.random);
router.post('/', usersListCtrl.create);
router.post('/addtolist', usersListCtrl.add);

router.post('/:id', usersListCtrl.update);
router.delete('/:id', usersListCtrl.delete);

module.exports = router;