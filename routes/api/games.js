const router = require("express").Router();
const gamesController = require("../../controllers/gamesController");

// ---------------- Matches with "/api/games" -------------------
router.route("/").get(gamesController.findAll)
 
module.exports = router;