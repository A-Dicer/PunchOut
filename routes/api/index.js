const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./users");
const fightersRoutes = require("./fighters");
const splitsRoutes = require("./splits");
const gamesRoutes = require("./games");

router.use("/auth", authRoutes); // Auth routes
router.use("/users", userRoutes); // User routes
router.use("/fighters", fightersRoutes); // Fighter routes
router.use("/splits", splitsRoutes); // Splits routes
router.use("/games", gamesRoutes); // Games routes

module.exports = router;
