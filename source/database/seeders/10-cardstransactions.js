'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('cardstransactions', [
        {
          card_id: 1,
          transactions_id: 1
        },
        {
          card_id: 1,
          transactions_id: 2
        },
        {
          card_id: 1,
          transactions_id: 3
        },
        {
          card_id: 1,
          transactions_id: 4
        }, {
          card_id: 1,
          transactions_id: 5
        }, {
          card_id: 1,
          transactions_id: 6
        }, {
          card_id: 1,
          transactions_id: 7
        }
      ], {});
    } catch (error) {
      console.log(error)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('cardstransactions', null, {});
    } catch (error) {
      console.log(error)
    }
  }
};
