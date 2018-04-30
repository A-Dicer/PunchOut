const router = require("express").Router();
const authController = require("../../controllers/authController");
const passport = require("passport");

// --------------------- Matches with "/api/auth" --------------------------

router.route("/twitch").get(passport.authenticate("twitch")) //twitch sign in

router.route("/twitch/callback")
.get(passport.authenticate("twitch", { failureRedirect: "/" }), 
  function(req, res) {
    res.redirect("/Main/" + req.session.passport.user._id);
});

router.route("/logout").get(authController.logout) //logout
  
module.exports = router;
