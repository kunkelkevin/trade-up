const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Offer, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//get all
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
      attributes: ['id', 'description', 'console_type', 'pic_link', 'title', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'offer_id'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//get by id
router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'console_type', 'pic_link', 'title', 'post_url', 'created_at',
    ],
    include: [
      {
        model: Post,
        attributes: ['id', 'console_type', 'pic_link', 'title', 'post_url', 'created_at']
      },
      {
        model: Offer,
        attributes: ['id', 'description', 'user_id', 'post_id', 'accepted'],
        include: [
        {
          model: Post,
          attributes: ['title']
        },
        {
          model: Comment,
          attributes:['id', 'comment_text', 'user_id', 'offer_id']
        }
      ]
      },
    ]
  })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//post - pic link, title, description, user_id
router.post('/', withAuth, (req, res) => {
  Post.create({
    pic_link: req.body.pic_link,
    title: req.body.title,
    description: req.body.description,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//put by id
router.put('/:id', withAuth, (req, res) => {
    Post.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//delete by id
router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
