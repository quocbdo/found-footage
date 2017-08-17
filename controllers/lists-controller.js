var List = require('../models/list');
var Movie = require('../models/movie');
var request = require('request');
const rootURL = 'https://api.themoviedb.org/3/';

function index(req, res) {
  List.find({}).populate('user movies').exec((err, lists) => {
    res.render('lists/index', {lists, user: req.user}); 
  });
}

function show(req, res) {
  List.findById(req.params.id).populate("user movies").exec((err, list) => {
    res.render('lists/show', {list, user: req.user});
  });
}

module.exports = {
  index,
  show
}