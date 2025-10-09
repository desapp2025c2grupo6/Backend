'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Direccion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Direccion.belongsTo(models.Afiliado, {
        foreignKey: 'afiliadoId',
        as: 'afiliado',
      });
    }
  }
  Direccion.init(
    {
      calle: DataTypes.STRING,
      numero: DataTypes.STRING,
      ciudad: DataTypes.STRING,
      afiliadoId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Direccion',
    }
  );
  return Direccion;
};
