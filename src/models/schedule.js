'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Schedule.belongsTo(models.Keyword,
                { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeData' }
            )
        }
    };
    Schedule.init({
        currentNumber: DataTypes.INTEGER,
        maxNumber: DataTypes.INTEGER,
        date: DataTypes.STRING,
        month: DataTypes.STRING,
        timeType: DataTypes.STRING,
        subjectId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};