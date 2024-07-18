'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Brand.hasMany(models.Model, {
        foreignKey: 'brandId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Brand.hasMany(models.Item, {
        foreignKey: 'brandId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Brand.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};