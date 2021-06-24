const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create Post model
class Post extends Model {}

// columns
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    console_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pic_link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quality: {
      type: DataTypes.INTEGER,
      validate: {
        //number needs to be between 1-5
        len: [1,5],
      },
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
