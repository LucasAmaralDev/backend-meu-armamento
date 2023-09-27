'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('arma', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      numeroSerie: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      fabricante: {
        type: Sequelize.STRING,
        allowNull: false
      },
      modelo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      calibre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      capacidadeCarregador: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      estadoConservacao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dataCadastro: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      anoFabricacao: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      armeiro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'armeiro',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }

    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('arma');
  }
};
