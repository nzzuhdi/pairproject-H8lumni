'use strict';
const {
  Model
} = require('sequelize');
const hashPassword = require('../helpers/hashPassword');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasMany(models.Post);
      User.hasMany(models.Share)
    }
  };
  User.init({
    username:  {
      type: DataTypes.STRING,
      validate:{
        notEmpty: { msg:"username required"},
        isNotExist(value) {
          User.findOne({
            where: {
              username: value
            }
          })
          .then(data => {
            if(data) {
              throw new Error('email already used');
            } 
          })
          .catch(err => {
            console.log(err);
          });
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {msg:"email required"},
        isNotExist(value) {
          User.findOne({
            where: {
              email: value
            }
          })
          .then(data => {
            if(data) {
              throw new Error('email already used');
            } 
          })
          .catch(err => {
            console.log(err);
          });
        }
      }
    },
    password: {
        type: DataTypes.STRING,
        validate:{
        notEmpty: { msg:"password required" }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = hashPassword(instance.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};