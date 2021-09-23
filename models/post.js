'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Post.init({
    title: {
      type: DataTypes.STRING,
    validate:{
      notEmpty: {msg:"pour the title~"}
    }},
    content:  {
      type: DataTypes.STRING,
    validate:{
      notEmpty: {msg:"pour the content~"}
    }},
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};