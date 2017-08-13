var Movie = require('../models/movie');
var request = require('request');
const rootURL = 'https://api.themoviedb.org/3/';

function index(req, res) {
    var options = {
        url: rootURL + 'discover/movie?sort_by=popularity.desc&api_key=' + process.env.TMDB_KEY  
    }
    request(options, function(err, response, body) {
        var moviesData = JSON.parse(body);
        moviesData = moviesData.results;
        res.render('movies/index', {moviesData, user: req.user});
    });
}

function show(req, res) {

}

function create(req, res) {

}

module.exports = {
    index,
    show,
    create
}