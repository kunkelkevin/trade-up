const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Offer } = require("../models");
const withAuth = require("../utils/auth");

// get all posts for dashboard
router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  console.log("======================");
  Post.findAll({
    attributes: [
      "id",
      "console_type",
      "pic_link",
      "title",
      "description",
      "quality",
      "user_id",
      "createdAt",
    ],
    include: [
      {
        model: Offer,
        attributes: ["id", "description", "user_id"],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: Comment,
            attributes: ["id", "comment_text", "created_at"],
            include: {
              model: User,
              attributes: ["username"],
            },
          },
        ],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const allData = dbPostData.map((post) => post.get({ plain: true }));
      const posts = allData.filter(
        (data) => data.user_id === req.session.user_id
      );
      const offers = allData.filter((data) => {
        for (let i = 0; i < data.offers.length; i++) {
          if (data.offers[i].user_id === req.session.user_id) {
            return true;
          }
        }
        return false;
      });
      // res.json(offers);
      res.render("dashboard", { posts, offers, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/create-trade", withAuth, (req, res) => res.render("create-trade"));

module.exports = router;
