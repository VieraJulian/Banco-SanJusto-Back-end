'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('usersCards', {
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
        card_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "cards",
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
      await queryInterface.dropTable('usersCards');
    } catch (error) {
      console.log(error)
    }
  }
};