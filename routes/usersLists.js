var express = require('express');
var router = express.Router();
var usersListCtrl = require('../controllers/usersLists-controller')

router.get('/', usersListCtrl.index);
router.get('/new', usersListCtrl.new);
router.get('/:id', usersListCtrl.show);
router.post('/', usersListCtrl.create);
router.post('/addtolist', usersListCtrl.add);

router.post('/:id', usersListCtrl.update);
router.delete('/:id', usersListCtrl.delete);
router.delete('/:id/:movieId', usersListCtrl.removeMovie);


module.exports = router;