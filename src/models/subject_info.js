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
            Subject_info.belongsTo(models.Subject, { foreignKey: 'subjectId' })
            Subject_info.belongsTo(models.Keyword, { foreignKey: 'price', targetKey: 'keyMap', as: 'priceTypeData' })
            Subject_info.belongsTo(models.Keyword, { foreignKey: 'province', targetKey: 'keyMap', as: 'provinceTypeData' })
            Subject_info.belongsTo(models.Keyword, { foreignKey: 'payment', targetKey: 'keyMap', as: 'paymentTypeData' })
            Subject_info.belongsTo(models.Keyword, { foreignKey: 'studyTime', targetKey: 'keyMap', as: 'studyTimeTypeData' })
        }
    };
    Subject_info.init({
        subjectId: DataTypes.INTEGER,
        courseId: DataTypes.INTEGER,
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