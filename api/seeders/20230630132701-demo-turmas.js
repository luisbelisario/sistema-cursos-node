'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Turmas', [
      {
        data_inicio: "2020-02-01",
        nivel_id: 1,
        mestre_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        data_inicio: "2020-02-01",
        nivel_id: 2,
        mestre_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        data_inicio: "2020-02-01",
        nivel_id: 3,
        mestre_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        data_inicio: "2020-07-01",
        nivel_id: 3,
        mestre_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Turmas', null, {});
  }
};
