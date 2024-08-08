'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.Category, {foreignKey: 'categoryId'});
      Item.belongsTo(models.Model, {foreignKey: 'modelId'});
      Item.belongsTo(models.Brand, {foreignKey: 'brandId'});
      Item.belongsTo(models.Store, {foreignKey: 'storeId'});
      Item.belongsTo(models.Type, {foreignKey: 'typeId'});

      Item.belongsToMany(models.Order, {through: 'ItemOrder', foreignKey: 'itemId'});
    }
  }
  Item.init({
    price: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      },
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};