var Movie = require('../models/movie');
var request = require('request');
const rootURL = 'https://api.themoviedb.org/3/';

function index(req, res) {
    var options = {
        url: rootURL + 'discover/movie?sort_by=popularity.desc&api_key=' + process.env.TMDB_KEY  
    };
    request(options, function(err, response, body) {
        var moviesData = JSON.parse(body);
        moviesData = moviesData.results;
        res.render('movies/index', {moviesData, user: req.user});
    });
}

function show(req, res) {
    var options =  {
        url: rootURL + 'movie/' + req.params.id + '?api_key=' + process.env.TMDB_KEY + '&append_to_response=credits'
    };
    request(options, function(err,response, body) {
        var movieData = JSON.parse(body);
        res.render('movies/show', {movieData, user: req.user});
    });
}

function create(req, res) {

}

module.exports = {
    index,
    show,
    create
}