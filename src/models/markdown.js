'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Markdown.belongsTo(models.Subject, { foreignKey: 'subjectId' })
        }
    };
    Markdown.init({
        lecturerId: DataTypes.INTEGER,
        subjectId: DataTypes.INTEGER,
        courseId: DataTypes.INTEGER,
        classId: DataTypes.INTEGER,
        contentCode: DataTypes.TEXT('long'),
        contentText: DataTypes.TEXT('long'),
        desc: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'Markdown',
    });
    return Markdown;
};