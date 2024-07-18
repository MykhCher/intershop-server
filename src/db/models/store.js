'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Store.hasMany(models.Item, {
        foreignKey: 'storeId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Store.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};