'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Share extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Share.belongsTo(models.User);
    }

    static getShareUserCount(userId) {
      let count;
      Share.findAll({
        where: {
          UserId:userId
        }
      })
      .then(data => {
        count = data.length;
      })
      .catch(err => {
        console.log(err);
      })

      return count;
    }

    get formatDate() {
     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

     return this.createdAt.toLocaleDateString('en-US', options);
   }

   elapsedTime() {
     let elapsed = (Date.now() - this.createdAt)/1000;
     if(elapsed < 60) {
       elapsed = Math.round(elapsed);
       elapsed = `${elapsed}s`;
     } else if (elapsed < 3600) {
       elapsed = Math.round(elapsed/60);
       elapsed = `${elapsed}m`;
     } else if(elapsed < 86400) {
       elapsed = Math.round(elapsed/3600);
       elapsed = `${elapsed}h`;
     } else if(elapsed < 2592000) {
       elapsed = Math.round(elapsed/86400);
       elapsed = `${elapsed}d`;
     } 

     return elapsed;
   }

  };
  Share.init({
    title: DataTypes.STRING,
    content: {
      type: DataTypes.TEXT,
      validate:{
        notEmpty: {msg:"content cannot empty"},
        minLength(value) {
          if (value.length < 20) {
            throw new Error('Content minimum has 20 characters');
          }
        }
      }
    },
    image: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Share',
  });
  return Share;
};