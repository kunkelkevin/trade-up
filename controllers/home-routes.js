const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Offer } = require("../models");

// get all posts for homepage
router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
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
      {
        model: Offer,
        attributes: ["id", "description"],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: Comment,
            attributes: ["id", "comment_text"],
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
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
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
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = dbPostData.get({ plain: true });
      let offerMade = false;
      let offerIndex = -1;
      let offer = {};
      let offers = [];
      let offer_id = 0;
      let anyOffer = false;
      if (post.offers) {
        offerIndex = post.offers.findIndex(
          (user) => user.user_id === req.session.user_id
        );
        offer = post.offers[offerIndex];
        offers = post.offers;
        if (offers.length > 0) {
          anyOffer = true;
        }
        if (offer) {
          offer_id = offer.id;
        }
        if (offerIndex !== -1) {
          offerMade = true;
        }
      }
      if (post.user_id === req.session.user_id) {
        res.render("single-dashboard", {
          post,
          loggedIn: req.session.loggedIn,
          anyOffer: anyOffer,
          offers: offers,
        });
      } else {
        res.render("single-post", {
          post,
          loggedIn: req.session.loggedIn,
          offerMade: offerMade,
          offer: offer,
          encodedJson: encodeURIComponent(JSON.stringify(offer_id)),
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
