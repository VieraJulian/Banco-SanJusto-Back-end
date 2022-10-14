'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('cards', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        number: {
          type: Sequelize.INTEGER
        },
        pin: {
          type: Sequelize.INTEGER
        },
        total: {
          type: Sequelize.INTEGER
        }
      });
    } catch (error) {
      console.log(error)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('cards');
    } catch (error) {
      console.log(error)
    }
  }
};