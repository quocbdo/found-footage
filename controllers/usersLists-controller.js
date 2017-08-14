var List = ('../models/list');
var Movie = ('../models/movie');

function index(req, res) {
    List.find({}, (err, lists) => {
        res.render('lists/index')
    })
}

function show(req, res) {
    List.findById(req.params.id)
}

function create(req, res) {
    var list = new List(req.body);
}

function newList(req, res) {
    console.log(req.user);
    res.render('usersList/new', {user: req.user});
}

function updateList(req, res) {

}

function deleteList(req, res) {
    List.findById(req.params.id, function(err, list) {
        list.remove();
        res.redirect('/lists');
    });
}

module.exports = {
    index,
    show,
    create,
    update: updateList,
    delete: deleteList,
    new: newList
}