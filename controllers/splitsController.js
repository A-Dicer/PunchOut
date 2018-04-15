const db = require("../models");

// Defining methods for the splitsController
module.exports = {
  findAll: function (req, res) {
      db.Splits
        .find(req.query)
        .populate({
          path: 'game.id',
          select: '-categories -title',
        })
        .populate({
          path: 'splits.fighter', 
          select: '-_id',
        })
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
  },

  findById: function (req, res) {
    if (req.user) {
      db.Splits
        .findById(req.params.id)
        .populate({
          path: 'game.id',
          select: '-categories -title',
        })
        .populate({
          path: 'splits.fighter', 
          select: '-_id',
        })
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
    }
    else { res.json({ error: "Please login", statusCode: 401 }) }
  },

  create: function(req, res) {
    db.Splits
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};


// findAll: function(req, res) {
//   db.Book
//     .find(req.query)
//     .sort({ date: -1 })
//     .then(dbModel => res.json(dbModel))
//     .catch(err => res.status(422).json(err));
// },
// findById: function(req, res) {
//   db.Book
//     .findById(req.params.id)
//     .then(dbModel => res.json(dbModel))
//     .catch(err => res.status(422).json(err));
// },
// create: function(req, res) {
//   db.Book
//     .create(req.body)
//     .then(dbModel => res.json(dbModel))
//     .catch(err => res.status(422).json(err));
// },
// update: function(req, res) {
//   db.Book
//     .findOneAndUpdate({ _id: req.params.id }, req.body)
//     .then(dbModel => res.json(dbModel))
//     .catch(err => res.status(422).json(err));
// },
// remove: function(req, res) {
//   db.Book
//     .findById({ _id: req.params.id })
//     .then(dbModel => dbModel.remove())
//     .then(dbModel => res.json(dbModel))
//     .catch(err => res.status(422).json(err));
// }