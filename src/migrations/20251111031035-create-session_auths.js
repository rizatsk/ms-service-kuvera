'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('session_auths', {
      id: { type: Sequelize.STRING({ length: 50 }), primaryKey: true },
      account_id: {
        type: Sequelize.STRING({ length: 50 }),
        allowNull: false,
        references: { model: 'accounts', key: 'id' },
        onDelete: 'CASCADE',
      },
      token: { type: Sequelize.TEXT, allowNull: false },
      created_dt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('session_auths');
  }
};
