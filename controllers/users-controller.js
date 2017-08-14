var User = require('../models/user');

function show(req, res) {
  User.findById(req.params.id).populate('lists').exec((err, user) => {
    res.render('userProfile/show', {user});
  });
}

module.exports = {
  show
}