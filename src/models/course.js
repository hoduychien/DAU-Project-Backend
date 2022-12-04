'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Course.hasMany(models.Subject_info, { foreignKey: 'id', as: 'courseData' })
        }
    };
    Course.init({
        name: DataTypes.STRING,
        desc: DataTypes.TEXT,
        schedule: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Course',
    });
    return Course;
};