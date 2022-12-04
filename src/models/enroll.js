"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Enroll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Enroll.belongsTo(models.User, {
        foreignKey: "studentId",
        targetKey: "id",
        as: "studentData",
      });

      Enroll.belongsTo(models.Keyword, {
        foreignKey: "timeType",
        targetKey: "keyMap",
        as: "timeTypeDataEnroll",
      });

      Enroll.belongsTo(models.Subject_info, {
        foreignKey: "subjectId",
        targetKey: "subjectId",
        as: "subjectIdData",
      });

      Enroll.belongsTo(models.Subject, {
        foreignKey: "subjectId",
        targetKey: "id",
        as: "subjectIdDataEnroll",
      });
    }
  }
  Enroll.init(
    {
      statusId: DataTypes.STRING,
      subjectId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
      lecturersId: DataTypes.INTEGER,
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Enroll",
    }
  );
  return Enroll;
};
