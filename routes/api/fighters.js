const router = require("express").Router();
const fightersController = require("../../controllers/fightersController");

// ------------- Matches with "/api/fighters" ------------------

router.route("/").get(fightersController.findAll)
 
module.exports = router;