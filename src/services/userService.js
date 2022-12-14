import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: [
            `id`,
            `email`,
            `roleId`,
            `password`,
            `firstName`,
            `lastName`,
            `avatar`,
          ],
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errorCode = 0;
            userData.message = "Success !!!";
            delete user.password;
            userData.user = user;
          } else {
            userData.errorCode = 3;
            userData.message = "Wrong password !!";
          }
        } else {
          userData.errorCode = 2;
          userData.message = `User not found`;
        }
      } else {
        userData.errorCode = 1;
        userData.message = `Email isn'n exist in system !!!`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (id === "all") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (id && id !== "all") {
        users = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email c?? t???n t???i ch??a
      let check = await checkEmail(data.email);
      if (check === true) {
        resolve({
          errorCode: 1,
          errorMessage: "Email already exists in the system !!!",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          avatar: data.avatar,
          phone: data.phone,
          gender: data.gender,
          position: data.position,
          roleId: data.roleId,
          desc: data.desc,
        });
        resolve({
          errorCode: 0,
          message: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let foundUser = await db.User.findOne({
      where: { id: userId },
    });
    if (!foundUser) {
      resolve({
        errorCode: 2,
        errorMessage: `User isn't exist`,
      });
    } else {
      await db.User.destroy({
        where: { id: userId },
      });
      resolve({
        errorCode: 0,
        message: `The user was deleted`,
      });
    }
  });
};

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.position || !data.gender) {
        resolve({
          errorCode: 2,
          errorMessage: "Missing",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phone = data.phone;
        // -----------
        user.gender = data.gender;
        user.roleId = data.roleId;
        user.position = data.position;
        user.avatar = data.avatar;
        user.desc = data.desc;
        // -----------
        await user.save();
        resolve({
          errorCode: 0,
          message: "Update user success",
        });
      } else {
        resolve({
          errorCode: 1,
          errorMessage: "User not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllKey = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!type) {
        resolve({
          errorCode: 1,
          errorMessage: "Missing required parameters !!!",
        });
      } else {
        let res = {};
        let allKey = await db.Keyword.findAll({
          where: { type: type },
        });
        res.errorCode = 0;
        res.data = allKey;
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUser: getAllUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getAllKey: getAllKey,
};
