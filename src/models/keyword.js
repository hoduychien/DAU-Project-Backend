"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Keyword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Keyword.hasMany(models.User, {
        foreignKey: "position",
        as: "positionData",
      });
      Keyword.hasMany(models.User, { foreignKey: "gender", as: "genderData" });
      Keyword.hasMany(models.Schedule, {
        foreignKey: "timeType",
        as: "timeTypeData",
      });
      Keyword.hasMany(models.Subject_info, {
        foreignKey: "price",
        as: "priceTypeData",
      });
      Keyword.hasMany(models.Subject_info, {
        foreignKey: "province",
        as: "provinceTypeData",
      });
      Keyword.hasMany(models.Subject_info, {
        foreignKey: "payment",
        as: "paymentTypeData",
      });
      Keyword.hasMany(models.Subject_info, {
        foreignKey: "studyTime",
        as: "studyTimeTypeData",
      });
      Keyword.hasMany(models.Enroll, {
        foreignKey: "timeType",
        as: "timeTypeDataEnroll",
      });
    }
  }
  Keyword.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      en: DataTypes.STRING,
      vi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Keyword",
    }
  );
  return Keyword;
};
