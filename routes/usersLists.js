var express = require('express');
var router = express.Router();
var usersListCtrl = require('../controllers/usersLists-controller');

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

router.get('/', isLoggedIn, usersListCtrl.index);
router.get('/new', isLoggedIn, usersListCtrl.new);
router.get('/:id', isLoggedIn, usersListCtrl.show);
router.post('/', isLoggedIn, usersListCtrl.create);
router.post('/addtolist', isLoggedIn, usersListCtrl.add);
router.post('/:id', isLoggedIn, usersListCtrl.update);
router.delete('/:id', isLoggedIn, usersListCtrl.delete);
router.delete('/:id/:movieId', isLoggedIn, usersListCtrl.removeMovie);

module.exports = router;