var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
    list: [{type: Schema.Types.ObjectId, ref: 'List'}]
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);