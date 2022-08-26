'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Enroll extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Enroll.init({
        statusId: DataTypes.STRING,
        classId: DataTypes.INTEGER,
        studentId: DataTypes.INTEGER,
        date: DataTypes.DATE,
        timeType: DataTypes.STRING

    }, {
        sequelize,
        modelName: 'Enroll',
    });
    return Enroll;
};