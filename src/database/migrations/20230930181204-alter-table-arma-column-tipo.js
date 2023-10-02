'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('arma', 'tipo')
    await queryInterface.addColumn('arma', 'tipo', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tipoArma',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('arma', 'tipo', {
      type: Sequelize.STRING,
      allowNull: false
    })
  }
};
