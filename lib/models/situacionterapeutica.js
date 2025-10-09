'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SituacionTerapeutica extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SituacionTerapeutica.belongsToMany(models.Afiliado, {
        through: 'AfiliadoSituacionTerapeutica',
        foreignKey: 'situacionTerapeuticaId',
        otherKey: 'afiliadoId',
        as: 'afiliados',
      });
    }
  }
  SituacionTerapeutica.init(
    {
      nombre: DataTypes.STRING,
      descripcion: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'SituacionTerapeutica',
    }
  );
  return SituacionTerapeutica;
};
