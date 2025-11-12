'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT INTO categories_spend (id, account_id, name, status, created_dt) VALUES
       ('019a7704-ec53-7d0a-a6cf-817b271cf3b9', 'all', 'monthly', true, NOW()),
       ('019a7704-ec53-7652-b236-8ddcf65cc4cf', 'all', 'pocket', true, NOW()),
       ('019a7704-ec53-705a-a696-4183b290fab1', 'all', 'internet', true, NOW()),
       ('019a7704-ec53-767f-a32e-3428839e9415', 'all', 'garage', true, NOW())
      `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM categories_spend WHERE id IN('019a7704-ec53-7d0a-a6cf-817b271cf3b9', '019a7704-ec53-7652-b236-8ddcf65cc4cf',
       '019a7704-ec53-705a-a696-4183b290fab1', '019a7704-ec53-767f-a32e-3428839e9415')
      `);
  }
};
