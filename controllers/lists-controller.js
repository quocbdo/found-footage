var List = require('../models/list');
var Movie = require('../models/movie');
var request = require('request');
const rootURL = 'https://api.themoviedb.org/3/';

function index(req, res) {
  List.find({}).populate('user movies').exec((err, lists) => {
    res.render('lists/index', {lists, user: req.user}); 
  });
}

function show(req, res) {
  List.findById(req.params.id).populate('user movies comments.user').exec((err, list) => {
    res.render('lists/show', {list, user: req.user});
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


module.exports = {
  index,
  show,
  createComment,
  deleteComment
}