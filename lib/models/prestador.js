'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prestador extends Model {
    static associate(models) {
      // prestador may have telefonos and direcciones similar to Afiliado
      Prestador.hasMany(models.Telefono, {
        foreignKey: 'prestadorId',
        as: 'telefonos',
      });

      Prestador.hasMany(models.Direccion, {
        foreignKey: 'prestadorId',
        as: 'direcciones',
      });
    }
  }
  Prestador.init(
    {
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
      CUIT: DataTypes.STRING,
      especialidad: DataTypes.STRING,
      diasAtencion: DataTypes.STRING,
      horarioAtencion: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Prestador',
    }
  );
  return Prestador;
};
