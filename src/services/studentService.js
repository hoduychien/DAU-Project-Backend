import db from "../models/index";
import sendEmailService from "./sendEmailService";
require("dotenv").config();
import { v4 as uuidv4 } from "uuid";

let buildToken = (subjectId, token) => {
  let result = `${process.env.URL_REACT}/verify?token=${token}&subjectId=${subjectId}`;
  return result;
};

let studentRegisterSubject = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.timeType ||
        !data.date ||
        !data.subjectId ||
        !data.fullName ||
        !data.phone ||
        !data.address
      ) {
        resolve({
          errorCode: 1,
          errorMessage: "Mising !",
        });
      } else {
        let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

        await sendEmailService.sendEmail({
          studentEmail: data.email,
          subjectName: data.subjectName,
          studentName: data.fullName,
          time: data.timeString,
          lecturersId: data.lecturersId,
          link: buildToken(data.subjectId, token),
          language: data.language,
          price: data.price,
          timeStudy: data.timeStudy,
          realTime: data.realTime,
        });
        let user = await db.User.findOrCreate({
          where: {
            email: data.email,
          },
          defaults: {
            email: data.email,
            roleId: "R3",
            phone: data.phone,
            address: data.address,
            firstName: data.fullName,
          },
        });

        if (user && user[0]) {
          await db.Enroll.findOrCreate({
            where: {
              studentId: user[0].id,
            },
            defaults: {
              statusId: "S1",
              subjectId: data.subjectId,
              lecturersId: data.lecturersId,
              studentId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }

        if (user && user[0]) {
          let res = await db.Enroll.findAll({
            where: {
              subjectId: data.subjectId,
            },
          });

          if (res.length > 0) {
            resolve({
              errorCode: 0,
              errorMessage:
                "Khóa học này đã được đăng ký trước đó vui lòng kiểm tra lịch sử",
            });
          } else {
            await db.Enroll.create({
              statusId: "S1",
              subjectId: data.subjectId,
              lecturersId: data.lecturersId,
              studentId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            });
            resolve({
              errorCode: 0,
              errorMessage:
                "Đăng ký thành công vui lòng kiểm tra email để xác nhận",
              data: user,
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let verifyRegisterSubjects = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.subjectId) {
        resolve({
          errorCode: 1,
          errorMessage: "Mising !",
        });
      } else {
        let res = await db.Enroll.findOne({
          where: {
            subjectId: data.subjectId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (res) {
          res.statusId = "S2";
          await res.save();
          resolve({
            errorCode: 0,
            errorMessage: "Xác nhận đăng ký khoá học thành công",
          });
        } else {
          resolve({
            errorCode: -2,
            errorMessage: "Khoá học đã được xác nhận hoặc không tồn tại !",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getListRegisterLecturers = (subjectId, lecturersId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!subjectId || !lecturersId) {
        resolve({
          errorCode: 1,
          errorMessage: "Mising !",
        });
      } else {
        let data = await db.Enroll.findAll({
          where: {
            subjectId: subjectId,
            lecturersId: lecturersId,
          },
          include: [
            {
              model: db.User,
              as: "studentData",
              attributes: ["id", "email", "address", "phone", "firstName"],
            },
            {
              model: db.Keyword,
              as: "timeTypeDataEnroll",
              attributes: ["en", "vi"],
            },
            {
              model: db.Subject_info,
              as: "subjectIdData",
              attributes: ["lecturersId"],
              include: [
                {
                  model: db.User,
                  as: "lecturersSubjectData",
                  attributes: [
                    "id",
                    "email",
                    "address",
                    "phone",
                    "firstName",
                    "lastName",
                  ],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });

        resolve({
          errorCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let sentEmailForStudent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.studentEmail ||
        !data.lecturersEmail ||
        !data.studentId ||
        !data.subjectId
      ) {
        resolve({
          errorCode: 1,
          errorMessage: "Mising !",
        });
      } else {
        let res = await db.Enroll.findOne({
          where: {
            subjectId: data.subjectId,
            studentId: data.studentId,
            timeType: data.timeType,
            // statusId: "S2",
          },
          raw: false,
        });

        if (res) {
          res.statusId = "S3";
          await res.save();
        }

        await sendEmailService.sentConfirmEmail(data);

        resolve({
          errorCode: 0,
          errorMessage: "done~",
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getHistorySchedule = (studentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!studentId) {
        resolve({
          errorCode: 1,
          errorMessage: "Misingss !",
        });
      } else {
        let res = await db.Enroll.findAll({
          where: {
            studentId: studentId,
          },
          include: [
            {
              model: db.User,
              as: "studentData",
              attributes: ["id", "email", "address", "phone", "firstName"],
            },
            {
              model: db.Keyword,
              as: "timeTypeDataEnroll",
              attributes: ["en", "vi"],
            },
            {
              model: db.Subject,
              as: "subjectIdDataEnroll",
              attributes: ["name"],
            },

            {
              model: db.Subject_info,
              as: "subjectIdData",
              attributes: ["lecturersId", "address", "province"],
              include: [
                {
                  model: db.User,
                  as: "lecturersSubjectData",
                  attributes: [
                    "id",
                    "email",
                    "address",
                    "phone",
                    "firstName",
                    "lastName",
                  ],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });

        resolve({
          errorCode: 0,
          errorMessage: "ok",
          data: res,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  studentRegisterSubject: studentRegisterSubject,
  verifyRegisterSubjects: verifyRegisterSubjects,
  getListRegisterLecturers: getListRegisterLecturers,
  sentEmailForStudent: sentEmailForStudent,
  getHistorySchedule: getHistorySchedule,
};
