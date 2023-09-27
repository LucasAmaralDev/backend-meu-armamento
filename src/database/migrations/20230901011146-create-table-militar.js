'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('militar', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      registroMilitar: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      batalhao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dataCadastro: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable('militar');
  }
};
