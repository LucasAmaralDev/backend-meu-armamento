'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('militar', 'batalhao')
    await queryInterface.addColumn('militar', 'batalhao', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'batalhao',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('militar', 'batalhao', {
      type: Sequelize.STRING(100),
      allowNull: false
    })
  }
};
