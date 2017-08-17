var List = require('../models/list');
var Movie = require('../models/movie');
var User = require('../models/user');
var request = require('request');
const rootURL = 'https://api.themoviedb.org/3/';

function index(req, res) {
    List.find({}, (err, lists) => {
        res.render('userslist/index')
    });
}

function show(req, res) {
    List.findById(req.params.id).populate('movies').exec((err, list) => { 
        res.render('usersList/show', {list, user: req.user});
    });   
}

function create(req, res) {
    console.log(req.body);
    var newList = new List(req.body);
    newList.user = req.user.id;
    newList.save((err, list) => {
        console.log(list);
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
    List.findByIdAndUpdate(req.params.id, req.body, (err, list) => {
        res.redirect('/users/' + req.body.userId + '/lists/' + list.id);
    });
}

function removeMovie(req, res) {
    List.findById(req.params.id, (err, list) => {
        list.movies.remove(req.params.movieId);
        list.save(() => {
            res.redirect('/users/' + req.user.id + '/lists/' + list.id);
        });
    });
}

function deleteList(req, res) {
    List.findById(req.params.id, function(err, list) {
        list.remove();
        User.findById(req.user.id, (err, user) => {
            user.lists.remove(req.params.id);
            user.save(() => {
                res.redirect('/users/' + req.user.id);
            });
        });
    });
}

function addToList(req, res) {
    var options =  {
        url: rootURL + 'movie/' + req.body.movieId + '?api_key=' + process.env.TMDB_KEY + '&append_to_response=credits'
    };

    request(options, function(err, response, body) {
        
        var movieData = JSON.parse(body);

        var checkDb = new Promise(function(resolve, reject) {
            Movie.find({tmdb: req.body.movieId}, (err, movies) => {
                if (movies.length > 0) {
                    List.findById(req.body.list, (err, list) => {
                        list.movies.push(movies[0]._id);
                        list.save(() => {
                            res.redirect('/movies/' + req.body.movieId);
                            resolve(false);
                        });
                    })
                } else {
                    resolve(true);
                }
            })
        })
        
        checkDb.then(function(newMovie) {
            if(newMovie) {
                var movie = new Movie({tmdb: movieData.id,
                                    title: movieData.title, 
                                    overview: movieData.overview,
                                    release_date: movieData.release_date,
                                    vote_average: movieData.vote_average,
                                    poster_path: movieData.poster_path,
                                    backdrop_path: movieData.backdrop_path});

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
    add: addToList,
    removeMovie
}