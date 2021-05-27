'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class view extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  view.init({
    time: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    document_id: DataTypes.INTEGER,
    view_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'view',
  });
  return view;
};