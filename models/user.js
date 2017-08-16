var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    googleId: String,
    lists: [{type: Schema.Types.ObjectId, ref: 'List'}]
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);