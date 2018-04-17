const db = require("../models");

module.exports = {

//--------------------------- Find All Games -------------------------------
  findAll: function (req, res) {
    if (req.user) {
      db.Game.find(req.query)
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
    } else { res.json({ error: "Please login", statusCode: 401 }) }
  }
};