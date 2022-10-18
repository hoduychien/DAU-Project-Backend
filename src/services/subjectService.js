import db from '../models/index';
require('dotenv').config();
import _ from "lodash";
import moment from "moment";



const MAX_NUMBER_CLASS = process.env.MAX_NUMBER_CLASS;

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
        let subject = await db.Subject.findOne({
            where: { id: id }
        })
        if (!subject) {
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

let updateSubject = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errorCode: 2,
                    errorMessage: 'Missing'
                })
            }
            let subject = await db.Subject.findOne({
                where: { id: data.id },
                raw: false
            })
            if (subject) {
                subject.name = data.name;
                subject.location = data.location;
                subject.desc = data.desc;
                subject.image = data.image;
                // -----------
                await subject.save();
                resolve({
                    errorCode: 0,
                    message: 'Update subject success'
                })
            }
            else {
                resolve({
                    errorCode: 1,
                    errorMessage: 'Subject not found'
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

let checkDetailSubject = (subjectId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let subject = await db.Markdown.findOne({
                where: { subjectId: subjectId }
            })
            if (subject) {
                resolve({
                    checks: true,
                    detailId: subject.id
                });
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let saveInfoSubject = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkDetailSubject(data.subjectId);
            if (check.checks === true) {
                if (!data.subjectId || !data.contentCode || !data.contentText) {
                    resolve({
                        errorCode: 1,
                        errorMessage: 'Missing'
                    })
                }

                else {
                    console.log(check.detailId)

                    let subjectDetail = await db.Markdown.findOne({
                        where: { id: check.detailId },
                        raw: false
                    })
                    subjectDetail.contentCode = data.contentCode,
                        subjectDetail.contentText = data.contentText,
                        subjectDetail.desc = data.desc,
                        subjectDetail.subjectId = data.subjectId,
                        await subjectDetail.save();
                    resolve({
                        errorCode: 0,
                        errorMessage: 'Update success'
                    })

                }
            }

            else {
                if (!data.subjectId || !data.contentCode || !data.contentText) {
                    resolve({
                        errorCode: 1,
                        errorMessage: "Mising"
                    })
                }
                else {
                    console.log("create");
                    await db.Markdown.create({
                        contentCode: data.contentCode,
                        contentText: data.contentText,
                        desc: data.desc,
                        subjectId: data.subjectId,
                    })
                    resolve({
                        errorCode: 0,
                        errorMessage: "Save done ~~~"
                    })
                }
            }

            // if (!data.subjectId || !data.contentCode || !data.contentText) {
            //     resolve({
            //         errorCode: 1,
            //         errorMessage: "Mising"
            //     })
            // }
            // else {
            //     console.log("create");
            //     await db.Markdown.create({
            //         contentCode: data.contentCode,
            //         contentText: data.contentText,
            //         desc: data.desc,
            //         subjectId: data.subjectId,
            //     })
            //     resolve({
            //         errorCode: 0,
            //         errorMessage: "Save done ~~~"
            //     })
            // }


        } catch (error) {
            reject(error);
        }
    })
}

let getDetailSubjectService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing !!!"
                })
            } else {
                let data = await db.Subject.findOne({
                    where: { id: id },
                    // attributes: {
                    //     exclude: ['image']
                    // },
                    include: [
                        { model: db.Markdown, attributes: ['desc', 'contentCode', 'contentText'] }
                    ],
                    raw: true,
                    nest: true
                })
                resolve({
                    errorCode: 0,
                    data: data
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let createSubjectShedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.arrSchedule || !data.subjectId || !data.dateFormat) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing"
                })
            }
            else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_CLASS;
                        return item;
                    })
                }

                let existing = await db.Schedule.findAll(
                    {
                        where: { subjectId: data.subjectId, date: data.dateFormat },
                        attributes: ['timeType', 'date', 'subjectId', 'maxNumber'],
                        raw: true
                    }
                )


                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date
                });

                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                    resolve({
                        errorCode: 0,
                        errorMessage: 'Create schedule success ~~~'
                    })
                }
                else {
                    resolve({
                        errorCode: -1,
                        errorMessage: 'Opps, wrong operation, please try again =))'
                    })
                }


            }

        } catch (error) {
            reject(error);
        }
    })
}

let getCheduleByMonth = (subjectId, month) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!subjectId || !month) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing"
                })
            } else {
                let data = await db.Schedule.findAll({
                    where: {
                        subjectId: subjectId,
                        month: month
                    },
                    include: [
                        {
                            model: db.Keyword,
                            as: "timeTypeData",
                            attributes: ['vi', 'en']
                        }
                    ],
                    raw: true,
                    nest: true
                })
                if (!data) {
                    data = [];
                }
                else {
                    resolve({
                        errorCode: 0,
                        data: data
                    })
                }

            }
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    createSubject: createSubject,
    getAllSubject: getAllSubject,
    deleteSubject: deleteSubject,
    updateSubject: updateSubject,
    saveInfoSubject: saveInfoSubject,
    getDetailSubjectService: getDetailSubjectService,
    createSubjectShedule: createSubjectShedule,
    getCheduleByMonth: getCheduleByMonth
}