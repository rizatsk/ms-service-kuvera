'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: { type: Sequelize.STRING({ length: 50 }), primaryKey: true },
      account_id: { 
        type: Sequelize.STRING({ length: 50 }), 
        allowNull: false,
        references: { model: 'accounts', key: 'id' },
      },
      category_id: {
        type: Sequelize.STRING({ length: 50 }), 
        allowNull: false,
        references: { model: 'categories_spend', key: 'id' },
      },
      money_spent: { type: Sequelize.BIGINT, allowNull: false },
      notes: { type: Sequelize.STRING({ length: 150 }), allowNull: true },
      type: { type: Sequelize.STRING({ length: 100 }), allowNull: false },
      created_dt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};
