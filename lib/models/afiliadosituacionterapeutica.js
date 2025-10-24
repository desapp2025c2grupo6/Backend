'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AfiliadoSituacionTerapeutica extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      // define association here
    }
  }
  AfiliadoSituacionTerapeutica.init(
    {
      afiliadoId: DataTypes.INTEGER,
      situacionTerapeuticaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'AfiliadoSituacionTerapeutica',
    }
  );
  return AfiliadoSituacionTerapeutica;
};
