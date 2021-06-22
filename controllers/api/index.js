const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const postRoutes = require("./post-routes");
const offerRoutes = require("./offer-routes");
const commentRoutes = require("./comment-routes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/offers", offerRoutes);
router.use("/comments", commentRoutes);

module.exports = router;