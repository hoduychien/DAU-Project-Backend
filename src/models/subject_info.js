'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Subject_info extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Subject_info.init({
        subjectId: DataTypes.INTEGER,
        price: DataTypes.STRING,
        payment: DataTypes.STRING,
        studyTime: DataTypes.STRING,
        address: DataTypes.STRING,
        province: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Subject_info',
        freezeTableName: true
    });
    return Subject_info;
};