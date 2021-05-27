'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  document.init({
    document_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    number_of_shares: DataTypes.INTEGER,
    number_of_comments: DataTypes.INTEGER,
    number_of_views: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'document',
  });
  return document;
};