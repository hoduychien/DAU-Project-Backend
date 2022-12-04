import studentService from "../services/studentService";

let studentRegisterSubject = async (req, res) => {
  try {
    let message = await studentService.studentRegisterSubject(req.body);
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Server error !!!",
    });
  }
};

let verifyRegisterSubjects = async (req, res) => {
  try {
    let message = await studentService.verifyRegisterSubjects(req.body);
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Server error !!!",
    });
  }
};

let getListRegisterLecturers = async (req, res) => {
  try {
    let message = await studentService.getListRegisterLecturers(
      req.query.subjectId,
      req.query.lecturersId
    );
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Server error !!!",
    });
  }
};

let sentEmailForStudent = async (req, res) => {
  try {
    let message = await studentService.sentEmailForStudent(req.body);
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Server error !!!",
    });
  }
};

let getHistorySchedule = async (req, res) => {
  try {
    let response = await studentService.getHistorySchedule(req.query.studentId);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Server error !!!",
    });
  }
};

module.exports = {
  studentRegisterSubject: studentRegisterSubject,
  verifyRegisterSubjects: verifyRegisterSubjects,
  getListRegisterLecturers: getListRegisterLecturers,
  sentEmailForStudent: sentEmailForStudent,
  getHistorySchedule: getHistorySchedule,
};
