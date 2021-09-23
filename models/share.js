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

     get formatDate() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

      return this.createdAt.toLocaleDateString('en-US', options);
    }
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

    static associate(models) {
      // define association here
      Share.belongsTo(models.User);
    }
  };
  Share.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Share',
  });
  return Share;
};