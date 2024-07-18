'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemModel.belongsTo(models.Brand, {
        foreignKey: 'brandId'
      });
      ItemModel.hasMany(models.Item, {
        foreignKey: 'modelId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  ItemModel.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Model',
  });
  return ItemModel;
};