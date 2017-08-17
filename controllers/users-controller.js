var User = require('../models/user');

function show(req, res) {
  User.findById(req.params.id).populate({path:'lists', model:'List', populate: {path:'movies', model:'Movie'}}).exec((err, user) => {
    res.render('userProfile/show', {user});
  });
}

module.exports = {
  show
}