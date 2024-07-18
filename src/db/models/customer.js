'use strict';

const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.hasMany(models.Order, {
        foreignKey: 'customerId'
      });
    }
  }
  Customer.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(data) {
        this.setDataValue('password', bcrypt.hashSync(data, 8));
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
  }, {
    sequelize,
    modelName: 'Customer',
    indexes: [{
      unique: true,
      fields: ['full_name', 'email']
    }]
  });
  return Customer;
};