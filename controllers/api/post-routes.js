const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Offer, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
const fs = require("fs");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "sample",
  api_key: "874837483274837",
  api_secret: "a676b67565c6767a6767d6767f676fe1",
});

//get all
router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
    attributes: [
      "id",
      "description",
      "console_type",
      "pic_link",
      "title",
      "quality",
    ],
    order: [["created_at", "DESC"]],
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
            attributes: ["comment_text"],
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
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get by id
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "description",
      "console_type",
      "pic_link",
      "title",
      "quality",
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
            attributes: ["comment_text"],
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
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//post - pic link, title, description, user_id
router.post("/", withAuth, (req, res) => {
  const img = req.body.img;
  Post.create({
    pic_link: req.body.pic_link,
    title: req.body.title,
    console_type: req.body.console_type,
    quality: req.body.quality,
    description: req.body.description,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => {
      fs.writeFile(
        "./public/img/" + dbPostData.id + "." + dbPostData.pic_link,
        Buffer.from(img, "base64"),
        (err) => {
          if (err) console.log(err);
          else {
            console.log("File written successfully");
          }
        }
      );

      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//put by id
router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete by id
router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
