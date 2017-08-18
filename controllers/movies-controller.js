var Movie = require('../models/movie');
var User = require('../models/user');
var request = require('request');
const rootURL = 'https://api.themoviedb.org/3/';

function index(req, res) {
    var options = {
        url: rootURL + 'movie/popular?api_key=' + process.env.TMDB_KEY  
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
    request(options, function(err, response, body) {
        var movieData = JSON.parse(body);
        if (req.user) {
            User.findById(req.user.id).populate("lists").exec(function(err, user){
                res.render('movies/show', {movieData, user: user});
            
            })
        } else {
            res.render('movies/show', {movieData, user: null});
        }
    });
}

function search(req, res) {
    var options = {
        url: rootURL + 'search/movie?api_key=' + process.env.TMDB_KEY + "&query=" + req.body.search
    };
    request(options, function(err, response, body) {
        var movieSearch = JSON.parse(body);
        movieSearch = movieSearch.results;
        res.render('movies/search', {movieSearch, user: req.user})
    })
}

module.exports = {
    index,
    show,
    search
}