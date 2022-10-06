import db from '../models/index';

let getLecturer = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Keyword, as: 'positionData', attribute: ['en', 'vi'] },
                    { model: db.Keyword, as: 'genderData', attribute: ['en', 'vi'] },
                ],
                raw: true,
                nest: true
            })

            resolve({
                errorCode: 0,
                data: users
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getLecturer: getLecturer
}