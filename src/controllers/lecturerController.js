import lecturerService from '../services/lecturerService';

let getLecturerList = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 6;
    try {
        let lecturer = await lecturerService.getLecturer(+limit);
        return res.status(200).json(lecturer);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            errorMessage: 'Server error ...'
        })
    }
}

module.exports = {
    getLecturerList: getLecturerList
}