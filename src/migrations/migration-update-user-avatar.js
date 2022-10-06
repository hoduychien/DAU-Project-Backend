module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'avatar', {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            }),
            queryInterface.changeColumn('Users', 'coverImage', {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'avatar', {
                type: Sequelize.STRING,
                allowNull: true,
            }),
            queryInterface.changeColumn('Users', 'coverImage', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    }
};