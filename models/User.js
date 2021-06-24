const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create User model
class User extends Model {}

// define table columns
User.init(
  {
  //id column
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  //username column
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  //email column
  //email: {
    //type: DataTypes.STRING,
    //allowNull: false,
    //no duplicates
    //unique: true,
 
    //validate: {
      //isEmail: true
    //}
  //},
  //password column
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      //password needs to be 7 characters long
      len: [7]
    }
  }
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'user'
}
);

module.exports = User;