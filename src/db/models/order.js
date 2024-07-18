'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Customer, {
        foreignKey: 'customerId'
      });
    }
  }
  Order.init({
    code: {
      type: DataTypes.INTEGER,
      unique: true
    },
    date: DataTypes.DATE,
    paid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};