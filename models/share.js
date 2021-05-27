'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class share extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  share.init({
    time: DataTypes.DATE,
    sharer_id: DataTypes.INTEGER,
    sharee_id: DataTypes.INTEGER,
    document_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'share',
  });
  return share;
};