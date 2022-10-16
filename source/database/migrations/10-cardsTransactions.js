'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('cardsTransactions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        card_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "cards",
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
      await queryInterface.dropTable('cardsTransactions');
    } catch (error) {
      console.log(error)
    }
  }
};