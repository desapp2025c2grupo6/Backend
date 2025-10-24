'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Prestadors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      apellido: {
        type: Sequelize.STRING,
      },
      CUIT: {
        type: Sequelize.STRING,
      },
      especialidad: {
        type: Sequelize.STRING,
      },
      diasAtencion: {
        type: Sequelize.STRING,
      },
      horarioAtencion: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Prestadors');
  },
};
