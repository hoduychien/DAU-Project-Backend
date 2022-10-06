import db from '../models/index';
let checkSubjectName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let subject = await db.Subject.findOne({
                where: { name: name }
            })
            if (subject) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}
let createSubject = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkSubjectName(data.name);
            if (check === true) {
                resolve({
                    errorCode: 1,
                    errorMessage: "The subject already exists !!!"
                })
            }
            else {
                await db.Subject.create({
                    name: data.name,
                    desc: data.desc,
                    location: data.location,
                    image: data.image
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

let getAllSubject = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let subject = ''
            if (id === 'all') {
                subject = await db.Subject.findAll({})
            }
            if (id && id !== 'all') {
                subject = await db.Subject.findOne({
                    where: { id: id }
                })
            }
            resolve(subject)
        } catch (error) {
            reject(error);
        }
    })
}
let deleteSubject = (id) => {
    return new Promise(async (resolve, reject) => {
        let course = await db.Subject.findOne({
            where: { id: id }
        })
        if (!course) {
            resolve({
                errorCode: 2,
                errorMessage: `Subject isn't exist`
            })
        }
        else {
            await db.Subject.destroy({
                where: { id: id }
            });
            resolve({
                errorCode: 0,
                message: `The subject was deleted`
            })
        }
    })
}


module.exports = {
    createSubject: createSubject,
    getAllSubject: getAllSubject,
    deleteSubject: deleteSubject
}