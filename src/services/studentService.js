import db from '../models/index';
import sendEmailService from './sendEmailService'
require('dotenv').config();
import { v4 as uuidv4 } from 'uuid';


let buildToken = (subjectId, token) => {
    let result = `${process.env.URL_REACT}/verify?token=${token}&subjectId=${subjectId}`
    return result;
}

let studentRegisterSubject = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.timeType || !data.date || !data.subjectId) {
                resolve({
                    errorCode: 1,
                    errorMessage: 'Mising !'
                });
            }
            else {

                let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

                await sendEmailService.sendEmail({
                    studentEmail: data.email,
                    subjectName: data.subjectName,
                    studentName: data.fullName,
                    time: data.timeString,
                    link: buildToken(data.subjectId, token),
                    language: data.language,
                    price: data.price,
                    timeStudy: data.timeStudy,
                    realTime: data.realTime
                })
                let user = await db.User.findOrCreate({
                    where: {
                        email: data.email
                    },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                })

                if (user && user[0]) {
                    await db.Enroll.findOrCreate({
                        where: {
                            studentId: user[0].id,
                        },
                        defaults: {
                            statusId: 'S1',
                            subjectId: data.subjectId,
                            studentId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }

                    })
                }

                resolve({
                    errorCode: 0,
                    errorMessage: "okok",
                    data: user
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let verifyRegisterSubjects = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.subjectId) {
                resolve({
                    errorCode: 1,
                    errorMessage: 'Mising !'
                });
            } else {
                let res = await db.Enroll.findOne({
                    where: {
                        subjectId: data.subjectId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (res) {
                    res.statusId = 'S2';
                    await res.save();
                    resolve({
                        errorCode: 0,
                        errorMessage: 'Xác nhận đăng ký khoá học thành công'
                    })
                } else {
                    resolve({
                        errorCode: -2,
                        errorMessage: "Khoá học đã được xác nhận hoặc không tồn tại !"
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    studentRegisterSubject: studentRegisterSubject,
    verifyRegisterSubjects: verifyRegisterSubjects
}