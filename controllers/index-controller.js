var List = require('../models/list');
var Movie = require('../models/movie');
var User = require('../models/user');
var request = require('request');
const rootURL = 'https://api.themoviedb.org/3/';

function random(req, res) {
    List.find({}, (err, lists) => {
        var i = Math.floor(Math.random() * lists.length)
        var randomList=lists[i]
        console.log(randomList);
        List.findById(randomList.id).populate("user movies").exec((err, results) => {
            console.log(results);
            res.render('lists/show', {list: results, user: req.user});
        })
    });
}

module.exports = {
    random
}