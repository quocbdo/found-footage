var List = require('../models/list');

function random(req, res) {
    List.find({}, (err, lists) => {
        var i = Math.floor(Math.random() * lists.length)
        var randomList=lists[i]
        console.log(randomList);
        List.findById(randomList.id).populate("user movies").exec((err, results) => {
            console.log(results);
            res.render('lists/show', {list: results, user: req.user});
        })
    });
}

module.exports = {
    random
}