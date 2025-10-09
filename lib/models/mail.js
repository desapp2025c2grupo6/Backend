'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mail.belongsTo(models.Afiliado, {
        foreignKey: 'afiliadoId',
        as: 'afiliado',
      });
    }
  }
  Mail.init(
    {
      direccion: DataTypes.STRING,
      afiliadoId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Mail',
    }
  );
  return Mail;
};
