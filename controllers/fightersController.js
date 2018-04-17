const db = require("../models");

module.exports = {

//------------------------- Find All Fighters -------------------------------
  findAll: function (req, res) {
    if (req.user) {
      db.Fighters.find(req.query)
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
    } else { res.json({ error: "Please login", statusCode: 401 }) }
  },

//---------------------- Find A Fighter By Name ------------------------------
  findByName: function (req, res) {
    if (req.user) {
      db.Fighters.find(req.params)
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
    } else { res.json({ error: "Please login", statusCode: 401 }) }
  },
}