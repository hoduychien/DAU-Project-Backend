import subjectService from '../services/subjectService';


let handleCreateSubject = async (req, res) => {
    let message = await subjectService.createSubject(req.body);
    return res.status(200).json({ message });
}

let handleGetAllSubject = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        return res.status(200).json({
            errorCode: 1,
            errorMessage: "Missing",
            subject: []
        })
    }
    let subject = await subjectService.getAllSubject(id);
    return res.status(200).json({
        errorCode: 0,
        errorMessage: "OK",
        subject
    })
}

let handleDeleteSubject = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errorCode: 1,
            errorMessage: "Missing"
        })
    }
    let message = await subjectService.deleteSubject(req.body.id);
    return res.status(200).json({ message });
}

let handleEditSubject = async (req, res) => {
    let data = req.body;
    let message = await subjectService.updateSubject(data);
    return res.status(200).json(message)
}

let handleSaveInfoSubject = async (req, res) => {
    try {
        let message = await subjectService.saveInfoSubject(req.body);
        return res.status(200).json(message);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Server error !!!"
        })
    }
}

let getDetailSubject = async (req, res) => {
    try {
        let response = await subjectService.getDetailSubjectService(req.query.id);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Server error !!!"
        })
    }
}

let handleCreateSubjectSchedule = async (req, res) => {
    try {
        let schedule = await subjectService.createSubjectShedule(req.body);
        return res.status(200).json(schedule);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Server error !!!"
        })
    }
}

let getCheduleByMonth = async (req, res) => {
    try {
        let schedule = await subjectService.getCheduleByMonth(req.query.subjectId, req.query.date);
        return res.status(200).json(schedule);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            errorMessage: "Server error !!!"
        })
    }
}

module.exports = {
    handleCreateSubject: handleCreateSubject,
    handleGetAllSubject: handleGetAllSubject,
    handleDeleteSubject: handleDeleteSubject,
    handleEditSubject: handleEditSubject,
    handleSaveInfoSubject: handleSaveInfoSubject,
    getDetailSubject: getDetailSubject,
    handleCreateSubjectSchedule: handleCreateSubjectSchedule,
    getCheduleByMonth: getCheduleByMonth
}