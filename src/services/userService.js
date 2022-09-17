import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {

        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: [`email`, `roleId`, `password`],
                    raw: true
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
                }
                else {
                    userData.errorCode = 2;
                    userData.message = `User not found`;
                }
            }
            else {
                userData.errorCode = 1;
                userData.message = `Email isn'n exist in system !!!`;
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    })
}

let checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (id === 'all') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    }
                })
            }
            if (id && id !== 'all') {
                users = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password'],
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error);
        }
    })
}

let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email có tồn tại chưa
            let check = await checkEmail(data.email);
            if (check === true) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Email already exists in the system !!!"
                })
            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phone: data.phone,
                    gender: data.gender,
                    roleId: data.roleId,
                })
                resolve({
                    errorCode: 0,
                    message: "ok"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: { id: userId }
        })
        if (!foundUser) {
            resolve({
                errorCode: 2,
                errorMessage: `User isn't exist`
            })
        }
        else {
            await db.User.destroy({
                where: { id: userId }
            });
            resolve({
                errorCode: 0,
                message: `The user was deleted`
            })
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errorCode: 2,
                    errorMessage: 'Missing'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phone = data.phone;
                await user.save();
                resolve({
                    errorCode: 0,
                    message: 'Update user success'
                })
            }
            else {
                resolve({
                    errorCode: 1,
                    errorMessage: 'User not found'
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
}