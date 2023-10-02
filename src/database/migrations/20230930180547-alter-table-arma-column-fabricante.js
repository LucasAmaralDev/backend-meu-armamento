'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('arma', 'fabricante')
    await queryInterface.addColumn('arma', 'fabricante', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'fabricante',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('arma', 'fabricante', {
      type: Sequelize.STRING,
      allowNull: false
    })
  }
};
