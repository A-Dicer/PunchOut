const db = require("../models");

// Defining methods for the gamesController
module.exports = {
  findAll: function (req, res) {
      db.Game
        .find(req.query)
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
  }
};