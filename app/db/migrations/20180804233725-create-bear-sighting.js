'use strict';

const { MODELS } = require('../../lib/constants/index');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(MODELS.BEARSIGHTING.TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      bear_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      zipcode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      num_bears: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(MODELS.BEARSIGHTING.TABLE);
  }
};
