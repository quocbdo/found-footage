var List = require('../models/list');
var Movie = require('../models/movie');
var User = require('../models/user');
var request = require('request');
const rootURL = 'https://api.themoviedb.org/3/';

function random(req, res) {
    List.find({}, (err, lists) => {
        var i = Math.floor(Math.random() * lists.length)
        var randomList=lists[i]
        res.render('random', {randomList, user: req.user});
    });
}

module.exports = {
    random
}