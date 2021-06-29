const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// get all posts for dashboard
router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  console.log("======================");
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "console_type",
      "pic_link",
      "title",
      "description",
      "quality",
      "createdAt",
    ],
    include: [
      //   {
      //     model: Offer,
      //     attributes: ["id", "description"],
      //     include: [
      //       {
      //         model: User,
      //         attributes: ["username"],
      //       },
      //       {
      //         model: Comment,
      //         attributes: ["id", "comment_text"],
      //         include: {
      //           model: User,
      //           attributes: ["username"],
      //         },
      //       },
      //     ],
      //   },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      //   res.json(posts);
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/create-trade", withAuth, (req, res) => res.render("create-trade"));

module.exports = router;
