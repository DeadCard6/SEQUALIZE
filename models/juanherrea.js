import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

class JuanHerrea extends Model {}

JuanHerrea.init({
  PrimerApellido: DataTypes.STRING,
  SegundoApellido: DataTypes.STRING,
  email: DataTypes.STRING
}, {
  sequelize,
  modelName: 'JuanHerrea',
});

export default JuanHerrea;
