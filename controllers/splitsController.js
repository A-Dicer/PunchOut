const db = require("../models");

module.exports = {
  
//--------------------------- Find All Splits -------------------------------
  findAll: function (req, res) {
    if (req.user) {
      db.Splits.find(req.query)
        .populate({path: 'game.id', select: '-_id -categories -title'})
        .populate({path: 'fighters'})
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
    } else { res.json({ error: "Please login", statusCode: 401 }) }
  },

//------------------------- Find A Split By ID ------------------------------
  findById: function (req, res) {
    if (req.user) {
      db.Splits.findById(req.params.id)
        .populate({path: 'game.id', select: '-categories -title'})
        .populate({path: 'fighters'})
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
    } else { res.json({ error: "Please login", statusCode: 401 }) }
  },

//--------------------------- Create A Split --------------------------------
  create: function(req, res) {
    if (req.user) {
      db.Splits.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else { res.json({ error: "Please login", statusCode: 401 }) }
  },

//--------------------------- Update A Split --------------------------------

  update: function(req, res) {
    if (req.user) { 
      db.Splits.findOneAndUpdate({ _id: req.params.id }, req.body )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else { res.json({ error: "Please login", statusCode: 401 }) }
  },
};