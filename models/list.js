var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
    name: {type: String, required: true},
    movies: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    summary: String,
    avgMovieRating: Number,
    genre: {
        type: String,
        enum: ['General', 'Sci-Fi', 'Action/Adventure','Comedy', 'Romance', 'Thriller', 'Drama']
    }
    }, {
        timestamps: true
    }
);

module.exports = mongoose.model('List', listSchema)