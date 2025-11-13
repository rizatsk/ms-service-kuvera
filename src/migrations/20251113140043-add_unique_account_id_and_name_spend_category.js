'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE categories_spend
        ADD CONSTRAINT unique_account_id_name UNIQUE (account_id, name);
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE categories_spend
        DROP CONSTRAINT unique_account_id_name;
    `);
  }
};
