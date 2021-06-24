// import all models
const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment");
const Offer = require("./Offer");

// create associations
User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Comment.belongsTo(Offer, {
  foreignKey: "offer_id",
  onDelete: "SET NULL",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Offer.hasMany(Comment, {
  foreignKey: "offer_id",
});

Offer.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Offer.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "SET NULL",
});

User.hasMany(Offer, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Post.hasMany(Offer, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Comment, Offer };
