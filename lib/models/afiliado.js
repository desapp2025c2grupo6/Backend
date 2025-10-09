'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Afiliado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Afiliado.belongsTo(models.GrupoFamiliar, {
        foreignKey: 'grupoFamiliarId',
        as: 'grupoFamiliar',
      });

      Afiliado.belongsTo(models.PlanMedico, {
        foreignKey: 'planMedicoId',
        as: 'planMedico',
      });

      Afiliado.hasMany(models.Telefono, {
        foreignKey: 'afiliadoId',
        as: 'telefonos',
      });

      Afiliado.hasMany(models.Mail, {
        foreignKey: 'afiliadoId',
        as: 'mails',
      });

      Afiliado.hasMany(models.Direccion, {
        foreignKey: 'afiliadoId',
        as: 'direcciones',
      });

      Afiliado.belongsToMany(models.SituacionTerapeutica, {
        through: 'AfiliadoSituacionTerapeutica',
        foreignKey: 'afiliadoId',
        otherKey: 'situacionTerapeuticaId',
        as: 'situacionesTerapeuticas',
      });
    }
  }
  Afiliado.init(
    {
      tipoDocumento: DataTypes.STRING,
      nroDocumento: DataTypes.STRING,
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
      fechaNacimiento: DataTypes.DATEONLY,
      parentesco: DataTypes.STRING,
      grupoFamiliarId: DataTypes.INTEGER,
      planMedicoId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Afiliado',
    }
  );
  return Afiliado;
};
