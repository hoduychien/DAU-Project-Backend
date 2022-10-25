'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Subject_info', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            subjectId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            price: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            payment: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            studyTime: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            province: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            address: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            note: {
                type: Sequelize.STRING
            },

            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Subject_info');
    }
};