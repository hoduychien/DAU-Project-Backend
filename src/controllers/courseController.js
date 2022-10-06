import courseService from '../services/courseService';


let handleCreateCourse = async (req, res) => {
    let message = await courseService.createCourse(req.body);
    return res.status(200).json({ message });
}

let handleGetAllCourses = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        return res.status(200).json({
            errorCode: 1,
            errorMessage: "Missing",
            courses: []
        })
    }
    let courses = await courseService.getAllCourse(id);
    return res.status(200).json({
        errorCode: 0,
        errorMessage: "OK",
        courses
    })
}

let handleDeleteCourse = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errorCode: 1,
            errorMessage: "Missing"
        })
    }
    let message = await courseService.deleteCourse(req.body.id);
    return res.status(200).json({ message });
}

let handleEditCourse = async (req, res) => {
    let data = req.body;
    let message = await courseService.updateCourse(data);
    return res.status(200).json(message)
}

module.exports = {
    handleCreateCourse: handleCreateCourse,
    handleGetAllCourses: handleGetAllCourses,
    handleDeleteCourse: handleDeleteCourse,
    handleEditCourse: handleEditCourse
}