var List = require('../models/list');
var Movie = require('../models/movie');

function index(req, res) {
  List.find({}).populate('user movies').exec((err, lists) => {
    res.render('lists/index', {lists, user: req.user, genre: null}); 
  });
}

function show(req, res) {
  if (req.user){
    var user = req.user
  } else {
    var user = null
  };
  List.findById(req.params.id).populate('user movies comments.user').exec((err, list) => {
    res.render('lists/show', {list, user: user});
  });
}

function createComment(req, res) {
    List.findById(req.params.id, (err, list) => {
      list.comments.push({content: req.body.content, user: req.user.id});
      list.save(() => {
        console.log(list)
          res.redirect('/lists/' + list.id)
      });
    });
}

function deleteComment(req, res) {
  List.findById(req.params.id, (err, list) => {
    console.log(req.params.id);
    list.comments.remove(req.params.commentId);
    console.log(req.params.commentId);
    list.save(() => {
      res.redirect('/lists/' + list.id)
    });
  });
}

function filter(req, res) {
  if(req.body.genres === "General") {
    List.find({}).populate('user movies').exec((err, lists) => {
      res.render('lists/index', {lists, user: req.user, genre: req.body.genres});
    })
  } else {
    List.find({genres: req.body.genres}).populate('user movies').exec((err, lists) => {
      res.render('lists/index', {lists, user: req.user, genre: req.body.genres});
    });
  }
}


module.exports = {
  index,
  show,
  createComment,
  deleteComment,
  filter
}