'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('categories_spend', {
      id: { type: Sequelize.STRING({ length: 50 }), primaryKey: true },
      account_id: { type: Sequelize.STRING({ length: 50 }), allowNull: false, defaultValue: 'all' },
      name: { type: Sequelize.STRING({ length: 50 }), allowNull: false },
      status: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true},
      created_dt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('categories_spend');
  }
};
