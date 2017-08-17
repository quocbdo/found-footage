var List = require('../models/list');

function index(req, res) {
  List.find({}).populate('user movies comments.user').exec((err, lists) => {
    res.status(200).json(lists);
  });
}

function show(req, res) {
  List.findById(req.params.id).populate('user movies comments.user').exec((err, list) => {
    res.status(200).json(list);
  });
}

module.exports = {
    index,
    show
}