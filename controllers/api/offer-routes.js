const router = require("express").Router();
const { Offer } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Offer.findAll()
    .then((dbOfferData) => res.json(dbOfferData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  Offer.create({
    description: req.body.description,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
  })
    .then((dbOfferData) => res.json(dbOfferData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Offer.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbOfferData) => {
      if (!dbOfferData) {
        res.status(404).json({ message: "No offer found with this id!" });
        return;
      }
      res.json(dbOfferData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
