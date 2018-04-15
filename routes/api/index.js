const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./users");
const fightersRoutes = require("./fighters");
const splitsRoutes = require("./splits");
const gamesRoutes = require("./games");


// Auth routes
router.use("/auth", authRoutes);
// User routes
router.use("/users", userRoutes);
// Fighter routes
router.use("/fighters", fightersRoutes);
// Splits routes
router.use("/splits", splitsRoutes);
// Games routes
router.use("/games", gamesRoutes);


module.exports = router;
