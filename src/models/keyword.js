'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Keyword extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Keyword.hasMany(models.User, { foreignKey: 'position', as: 'positionData' })
            Keyword.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
            Keyword.hasMany(models.Schedule, { foreignKey: 'timeType', as: 'timeTypeData' })
        }
    };
    Keyword.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        en: DataTypes.STRING,
        vi: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Keyword',
    });
    return Keyword;
};