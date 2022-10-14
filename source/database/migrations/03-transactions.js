'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('transactions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        addresse: {
          type: Sequelize.STRING
        },
        total: {
          type: Sequelize.INTEGER
        },
        date: {
          type: Sequelize.DATE
        },
        numberTransaction: {
          type: Sequelize.BIGINT
        }
      });
    } catch (error) {
      console.log(error)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('transactions');
    } catch (error) {
      console.log(error)
    }
  }
};