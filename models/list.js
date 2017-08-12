var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
    name: {type: String, required: true},
    movies: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    summary: String,
    avgMovieRarting: Number,
    genre: {
        type: String,
        enum: ['General', 'Sci-Fi', 'Action/Adventure','Comendy', 'Romance', 'Thriller', 'Drama']
    }
    }, {
        timestamps: true
    }
);

module.exports = mongoose.model('List', listSchema)