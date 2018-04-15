const db = require("../models");

// Defining methods for the fightersController
module.exports = {
  findAll: function (req, res) {
      db.Fighters
        .find(req.query)
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
  },

  findByName: function (req, res) {
    db.Fighters
      .find(req.params)
      .then(dbModel => res.json({results: dbModel, sess: req.session}))
      .catch(err => res.status(422).json(err));
  },
}