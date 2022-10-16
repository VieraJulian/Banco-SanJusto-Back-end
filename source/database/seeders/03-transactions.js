'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('transactions', [
        {
          addresse: "Fulanito",
          total: 20000,
          date: "2022/10/16 16:35:00",
          numberTransaction: 28930492874824
        },
        {
          addresse: "Mauricio",
          total: 560000,
          date: "2022/03/16 17:35:00",
          numberTransaction: 3247237423942
        },
        {
          addresse: "Jorge",
          total: 920000,
          date: "2022/01/16 16:35:00",
          numberTransaction: 238479823742
        },
        {
          addresse: "Maria",
          total: 390000,
          date: "2022/12/16 18:35:00",
          numberTransaction: 45679457645
        },
        {
          addresse: "Fernando",
          total: 346000,
          date: "2022/10/16 01:30:00",
          numberTransaction: 74637562342
        },
        {
          addresse: "Aldo",
          total: 34000,
          date: "2022/11/16 14:20:00",
          numberTransaction: 23479283498237423
        },
        {
          addresse: "Vanesa",
          total: 150000,
          date: "2022/06/16 13:48:00",
          numberTransaction: 143712984914
        }
      ], {});
    } catch (error) {
      console.log(error)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('transactions', null, {});
    } catch (error) {
      console.log(error)
    }
  }
};
