var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new mongoose.Schema({
    id: Number,
    title: {type: String, required: true},
    overview: String,
    cast: [String],
    release_date: String,
    genre: [String],
    vote_average: Number
});

module.exports= mongoose.model('Movie', movieSchema)