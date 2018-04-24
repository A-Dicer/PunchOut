const router = require("express").Router();
const splitsController = require("../../controllers/splitsController");

//--------------- Matches with "/api/splits" --------------------
router.route("/").get(splitsController.findAll).post(splitsController.create);
router.route("/:id").get(splitsController.findById)
 
module.exports = router;