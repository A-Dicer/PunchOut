const db = require("../models");

// Defining methods for the usersController
module.exports = {
  findAll: function (req, res) {
      db.User
        .find(req.query)
        .populate({
          path: 'splits.mtpo',  
        })
        .populate({
          path: 'splits.spo',  
        })
        .populate({
          path: 'splits.powii',  
        })
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
  },

  findById: function (req, res) {
    if (req.user) {
      db.User
        .findById(req.params.id)
        .populate({
          path: 'splits.mtpo',  
        })
        .populate({
          path: 'splits.spo',  
        })
        .populate({
          path: 'splits.powii',  
        })
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
    }
    else { res.json({ error: "Please login", statusCode: 401 }) }
  },

  update: function(req, res) {
    db.User
    .findOneAndUpdate({ _id: req.params.id }, req.body )
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
},

};
