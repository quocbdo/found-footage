var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users-controller');
var usersListCtrl = require('../controllers/usersLists-controller');

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

router.get('/:id', isLoggedIn, usersCtrl.show);


module.exports = router;
