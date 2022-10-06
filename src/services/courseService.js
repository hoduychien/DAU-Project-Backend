import db from '../models/index';
let checkCourseName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let course = await db.Course.findOne({
                where: { name: name }
            })
            if (course) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}
let createCourse = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkCourseName(data.name);
            if (check === true) {
                resolve({
                    errorCode: 1,
                    errorMessage: "The course already exists !!!"
                })
            }
            else {
                await db.Course.create({
                    name: data.name,
                    desc: data.desc,
                    schedule: data.schedule,
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

let getAllCourse = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let course = ''
            if (id === 'all') {
                course = await db.Course.findAll({})
            }
            if (id && id !== 'all') {
                course = await db.Course.findOne({
                    where: { id: id }
                })
            }
            resolve(course)
        } catch (error) {
            reject(error);
        }
    })
}

let deleteCourse = (id) => {
    return new Promise(async (resolve, reject) => {
        let course = await db.Course.findOne({
            where: { id: id }
        })
        if (!course) {
            resolve({
                errorCode: 2,
                errorMessage: `Course isn't exist`
            })
        }
        else {
            await db.Course.destroy({
                where: { id: id }
            });
            resolve({
                errorCode: 0,
                message: `The course was deleted`
            })
        }
    })
}

let updateCourse = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errorCode: 2,
                    errorMessage: 'Missing'
                })
            }
            let course = await db.Course.findOne({
                where: { id: data.id },
                raw: false
            })
            if (course) {
                course.name = data.name;
                course.schedule = data.schedule;
                course.desc = data.desc;
                course.image = data.image;
                // -----------
                await course.save();
                resolve({
                    errorCode: 0,
                    message: 'Update course success'
                })
            }
            else {
                resolve({
                    errorCode: 1,
                    errorMessage: 'course not found'
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    createCourse: createCourse,
    getAllCourse: getAllCourse,
    deleteCourse: deleteCourse,
    updateCourse: updateCourse
}