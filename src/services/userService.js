import bcrypt from 'bcryptjs';
import db from '../models/index';

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
            // console.log(userData);
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

module.exports = {
    handleUserLogin: handleUserLogin,
}