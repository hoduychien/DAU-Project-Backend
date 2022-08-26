'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Class_specialized extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Class_specialized.init({
        classId: DataTypes.INTEGER,
        courseId: DataTypes.INTEGER,
        teacherId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Class_specialized',
    });
    return Class_specialized;
};