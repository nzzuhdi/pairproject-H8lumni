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
      Post.belongsTo(models.User);
    }

    // get elapsed time after post
    elapsedTime() {
      let elapsed = (Date.now() - this.createdAt)/1000;
      // const sec = this.createdAt.getSeconds();
      // const min = this.createdAt.getMinutes();
      // const hour = this.createdAt.getHours();
      // const day = this.createdAt.getDay();
      // const month = this.createdAt.getMonth();
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