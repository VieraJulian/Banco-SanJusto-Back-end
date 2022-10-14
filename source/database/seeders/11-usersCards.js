'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('usersCards', [
        {
          user_id: 1,
          card_id: 1,
        },
        {
          user_id: 1,
          card_id: 3,
        },
        {
          user_id: 2,
          card_id: 2,
        },
        {
          user_id: 3,
          card_id: 4,
        },
        {
          user_id: 4,
          card_id: 5,
        },
      ], {});
    } catch (error) {
      console.log(error)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('usersCards', null, {});
    } catch (error) {
      console.log(error)
    }
  }
};
