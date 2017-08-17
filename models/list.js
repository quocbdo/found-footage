var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  content: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: true
});

var listSchema = new Schema({
    name: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    movies: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    summary: String,
    avgMovieRating: Number,
    comments: [commentSchema],
    genres: {
        type: [String],
        enum: ['General', 'Sci-Fi', 'Action','Comedy', 'Romance', 'Thriller', 'Drama', 'Adventure', 'Animation', 'Documentary', 'Crime', 'Family', 'Fantasy', 'Horror', 'Music', 'History', 'War', 'Mystery']
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('List', listSchema)