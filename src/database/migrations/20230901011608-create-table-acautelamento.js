'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('acautelamento', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      dataAcautelamento: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      dataDevolucao: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      militar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'militar',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      armeiro_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'armeiro',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
      ,
      arma_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'arma',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('acautelamento');
  }
};
