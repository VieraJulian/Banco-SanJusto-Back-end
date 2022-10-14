'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('users', [
        {
          name: "Julián"
        },
        {
          name: "Diego"
        },
        {
          name: "Mauricio"
        },
        {
          name: "Jorge"
        }
      ], {});
    } catch (error) {
      console.log(error)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('users', null, {});
    } catch (error) {
      console.log(error)
    }
  }
};
