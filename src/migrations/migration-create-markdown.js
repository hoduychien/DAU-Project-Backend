'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Markdowns', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            lecturerId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },

            subjectId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },

            courseId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            classId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            contentCode: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            contentText: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            desc: {
                allowNull: true,
                type: Sequelize.TEXT('long')
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
        await queryInterface.dropTable('Markdowns');
    }
};