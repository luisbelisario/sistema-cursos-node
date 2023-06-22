'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Pessoas', [
       {
         nome: 'Shiryu',
         ativo: true,
         email: 'shiryu@gmail.com',
         role: 'estudante',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         nome: 'Seiya',
         ativo: true,
         email: 'seiya@gmail.com',
         role: 'estudante',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         nome: 'Hyoga',
         ativo: true,
         email: 'hyoga@hyoga.com',
         role: 'estudante',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         nome: 'Shun',
         ativo: false,
         email: 'shun@gmail.com',
         role: 'estudante',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         nome: 'Dokko',
         ativo: true,
         email: 'dokko@gmail.com',
         role: 'mestre',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         nome: 'Mu',
         ativo: true,
         email: 'mu@gmail.com',
         role: 'mestre',
         createdAt: new Date(),
         updatedAt: new Date()
       }
     ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Pessoas', null, {});
  }
};
