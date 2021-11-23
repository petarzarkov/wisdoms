'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tblWisdoms', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        default: 0,
        type: Sequelize.SMALLINT
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(32)
      },
      joke: {
        allowNull: false,
        type: Sequelize.STRING(264)
      },
      lang: {
        allowNull: false,
        default: "en",
        type: Sequelize.STRING(264)
      },
      params: {
        allowNull: true,
        default: JSON.stringify({}),
        type: Sequelize.JSONB
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tblWisdoms');
  }
};