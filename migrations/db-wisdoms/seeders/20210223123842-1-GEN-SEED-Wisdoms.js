'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tblWisdoms', [{
       name: "My Test Wisdom",
       joke: "Hehehehe",
       lang: "en",
       params: JSON.stringify({})
    }, {
      name: "My Test Wisdom 2",
      joke: "Hehehehe",
      lang: "en",
      params: JSON.stringify({})
   }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tblWisdoms', null, { joke: "Hehehehe" });
  }
};
