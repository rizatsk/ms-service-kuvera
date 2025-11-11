'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.STRING({ length: 50 }), primaryKey: true },
      account_id: {
        type: Sequelize.STRING({ length: 50 }),
        allowNull: false,
        references: { model: 'accounts', key: 'id' },
        onDelete: 'CASCADE',
      },
      name: { type: Sequelize.STRING({ length: 100 }), allowNull: false },
      photo_profile_url: { type: Sequelize.STRING, allowNull: true },
      updated_dt: { type: Sequelize.DATE, allowNull: true },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
