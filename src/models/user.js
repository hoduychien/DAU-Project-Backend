"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Keyword, {
        foreignKey: "position",
        targetKey: "keyMap",
        as: "positionData",
      });
      User.belongsTo(models.Keyword, {
        foreignKey: "gender",
        targetKey: "keyMap",
        as: "genderData",
      });
      User.hasMany(models.Subject_info, {
        foreignKey: "id",
        as: "lecturersData",
      });
      User.hasMany(models.Enroll, {
        foreignKey: "studentId",
        as: "studentData",
      });

      User.hasMany(models.Subject_info, {
        foreignKey: "lecturersId",
        as: "lecturersSubjectData",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      gender: DataTypes.STRING,
      coverImage: DataTypes.STRING,
      avatar: DataTypes.STRING,
      position: DataTypes.STRING,
      roleId: DataTypes.STRING,
      desc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
