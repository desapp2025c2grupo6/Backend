'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlanMedico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PlanMedico.hasMany(models.Afiliado, {
        foreignKey: 'planMedicoId',
        as: 'afiliado',
      });
    }
  }
  PlanMedico.init(
    {
      nombre: DataTypes.STRING,
      codigo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'PlanMedico',
    }
  );
  return PlanMedico;
};
