var List = require('../models/list');
var Movie = require('../models/movie');
var User = require('../models/user');
var request = require('request');
const rootURL = 'https://api.themoviedb.org/3/';

function index(req, res) {
    List.find({}, (err, lists) => {
        res.render('lists/index')
    })
}

function show(req, res) {
    List.findById(req.params.id)
}

function create(req, res) {
    var list = new List(req.body);
    list.save((err, list) => {
        req.user.lists.push(list.id);
        req.user.save(() => {
            res.redirect('/users/' + req.user.id);
        });
    });
}

function newList(req, res) {
    res.render('usersList/new', {user: req.user});
}

function updateList(req, res) {
 
}

function deleteList(req, res) {
    List.findById(req.params.id, function(err, list) {
        list.remove();
        res.redirect('/lists');
    });
}

function addToList(req, res) {
    var options =  {
        url: rootURL + 'movie/' + req.body.movieId + '?api_key=' + process.env.TMDB_KEY + '&append_to_response=credits'
    };
    request(options, function(err, response, body) {
        var movieData = JSON.parse(body);
        var movie = new Movie({title: movieData.title, 
                               overview: movieData.overview,
                               release_date: movieData.release_date,
                               vote_average: movieData.vote_average});
        movieData.genres.forEach(function(genre) {
            movie.genres.push(genre.name);
        });
        if (movieData.credits.cast.length < 5) {
            var castNum = movieData.credits.cast.length;
        } else {
            var castNum = 5;
        }
        for (var i = 0; i < castNum; i++) {
            movie.cast.push(movieData.credits.cast[i].name);
        }
        movie.save((err, movie) => {
            List.findById(req.body.list, (err, list) => {
                list.movies.push(movie._id);
                list.save(() => {
                    res.redirect('/movies/' + req.body.movieId);
                });
            })
        });
    });
}

module.exports = {
    index,
    show,
    create,
    update: updateList,
    delete: deleteList,
    new: newList,
    add: addToList
}