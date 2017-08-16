var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    tmdb: Number,
    title: {type: String, required: true},
    overview: String,
    cast: [String],
    release_date: String,
    genres: [String],
    vote_average: Number,
    poster_path: String,
    backdrop_path: String
});

module.exports= mongoose.model('Movie', movieSchema)