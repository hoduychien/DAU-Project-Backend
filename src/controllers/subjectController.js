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

module.exports = {
    handleCreateSubject: handleCreateSubject,
    handleGetAllSubject: handleGetAllSubject,
    handleDeleteSubject: handleDeleteSubject
}