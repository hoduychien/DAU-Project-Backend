'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Subject extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Subject.hasOne(models.Markdown, { foreignKey: 'subjectId' })
            Subject.hasOne(models.Subject_info, { foreignKey: 'subjectId' })
        }
    };
    Subject.init({
        name: DataTypes.STRING,
        desc: DataTypes.TEXT,
        location: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Subject',
    });
    return Subject;
};