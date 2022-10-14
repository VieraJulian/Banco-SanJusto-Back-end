'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('cards', [
        {
          number: 4546857418565565,
          pin: 4345,
          total: 40555
        },
        {
          number: 5595345899897125,
          pin: 1595,
          total: 3566
        },
        {
          number: 4858669658871578,
          pin: 1234,
          total: 23
        },
        {
          number: 5854665625871547,
          pin: 4345,
          total: 300
        },
        {
          number: 4546989623571478,
          pin: 2300,
          total: 35621
        }
      ], {});
    } catch (error) {
      console.log(error)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('cards', null, {});
    } catch (error) {
      console.log(error)
    }
  }
};
