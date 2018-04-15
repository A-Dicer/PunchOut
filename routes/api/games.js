const router = require("express").Router();
const gamesController = require("../../controllers/gamesController");

// Matches with "/games"
router.route("/")
    .get(gamesController.findAll)
 
module.exports = router;