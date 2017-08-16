var List = require('../models/list');
var Movie = require('../models/movie');
var User = require('../models/user');
var request = require('request');
const rootURL = 'https://api.themoviedb.org/3/';

function index(req, res) {
    List.find({}, (err, lists) => {
        res.render('lists/index')
    });
}

function show(req, res) {
    List.findById(req.params.id).populate('movies').exec((err, list) => {
        console.log(list);
        
        res.render('usersList/show', {list, user: req.user});

    });   
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
        res.redirect('/users/' + req.user.id);
    });
}

function addToList(req, res) {
    console.log('addToList is called')
    var twice = false;

    var options =  {
        url: rootURL + 'movie/' + req.body.movieId + '?api_key=' + process.env.TMDB_KEY + '&append_to_response=credits'
    };

    request(options, function(err, response, body) {
        
        var movieData = JSON.parse(body);

        var checkDb = new Promise(function(resolve, reject) {
            Movie.find({tmdb: req.body.movieId}, (err, movies) => {
                console.log(movies);
                if (movies.length > 0) {
                    List.findById(req.body.list, (err, list) => {
                        list.movies.push(movies[0]._id);
                        list.save(() => {
                            console.log('Just add to list');
                            res.redirect('/movies/' + req.body.movieId);
                            resolve(false);
                        });
                    })
                } else {
                    resolve(true);
                }
            })
        })
        
        checkDb.then(function(added) {
            if(added) {
                console.log("Save and add to list");
                var movie = new Movie({tmdb: movieData.id,
                                    title: movieData.title, 
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
                            res.end();
                        });
                    })
                });
            }
        })
        
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