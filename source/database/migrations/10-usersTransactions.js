'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('usersTransactions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id"
          }
        },
        transactions_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "transactions",
            key: "id"
          }
        }
      });
    } catch (error) {
      console.log(error)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('usersTransactions');
    } catch (error) {
      console.log(error)
    }
  }
};