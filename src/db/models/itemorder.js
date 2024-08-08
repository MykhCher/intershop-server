'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemOrder.belongsTo(models.Item, {foreignKey: 'itemId'});
      ItemOrder.belongsTo(models.Order, {foreignKey: 'orderId'});
    }
  }
  ItemOrder.init({
    itemId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ItemOrder',
    tableName: 'ItemOrder'
  });
  return ItemOrder;
};