const passport = require("passport");
const User = require("../models/user");

module.exports = {

//------------------------- LogOut User -------------------------------
  logout: function (req, res) {
    req.logOut();
    return res.status(200).json({result:  "success"});
  }
};
