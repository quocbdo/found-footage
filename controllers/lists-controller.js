var List = require('../models/list');
var Movie = require('../models/movie');
var request = require('request');
const rootURL = 'https://api.themoviedb.org/3/';

function index(req, res) {
  List.find({}, (err, lists) => {
    res.render('lists/index', {lists, user: req.user}); 
  });
}

function show(req, res) {

}

module.exports = {
  index,
  show
}