import db from '../models/index';
require('dotenv').config();

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
                            timeType: data.timeType
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

module.exports = {
    studentRegisterSubject: studentRegisterSubject,
}