'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User);
    }
  };
  Profile.init({
    fullname: {
      type: DataTypes.STRING,
    validate:{
      notEmpty: {msg:"fullname required"}
    }},
    age:  {
      type: DataTypes.INTEGER,
    validate:{
      notEmpty: {msg:"age required"}
    }},
    gender:  {
      type: DataTypes.STRING,
   },
    batch:  {
      type: DataTypes.STRING,
    validate:{
      notEmpty: {msg:"batch required"}
    }},
    image: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        if(!instance.image) instance.image = "/images/no_image.png";
      }
    },
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};