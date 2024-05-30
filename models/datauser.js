'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DataUser.init({
    PrimerApellido: DataTypes.STRING,
    SegundoApellido: DataTypes.STRING,
    PrimerNombre: DataTypes.STRING,
    SegundoNombre: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DataUser',
  });
  return DataUser;
};