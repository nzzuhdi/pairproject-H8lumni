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
      notEmpty: {msg:"fill the name~"}
    }},
    age:  {
      type: DataTypes.INTEGER,
    validate:{
      notEmpty: {msg:"fill the age~"}
    }},
    gender:  {
      type: DataTypes.STRING,
    validate:{
      notEmpty: {msg:"male or"}
    }},
    batch:  {
      type: DataTypes.STRING,
    validate:{
      notEmpty: {msg:"pour the title~"}
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