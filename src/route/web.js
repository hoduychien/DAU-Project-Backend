import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import lectureController from '../controllers/lecturerController';
import courseController from '../controllers/courseController';
import subjectController from '../controllers/subjectController';
import studentController from '../controllers/studentController';


let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getCRUDUser);

    // test
    router.get('/crud', homeController.getCRUD);
    router.post('/add-user', homeController.postCRUD);
    router.get('/get-user', homeController.getCRUDUser);
    router.get('/edit-user', homeController.editUser);
    router.post('/put-crud', homeController.updateUser);
    router.get('/delete-user', homeController.deleteUser);

    //users
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-user', userController.handleCreateUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    // keywords
    router.get('/api/get-key', userController.handleGetKey);

    // lecturers
    router.get('/api/get-lecturer-list', lectureController.getLecturerList);

    // courses
    router.get('/api/get-all-courses', courseController.handleGetAllCourses);
    router.post('/api/create-courses', courseController.handleCreateCourse);
    router.put('/api/edit-courses', courseController.handleEditCourse);
    router.delete('/api/delete-courses', courseController.handleDeleteCourse);

    // subject
    router.get('/api/get-all-subject', subjectController.handleGetAllSubject);
    router.post('/api/create-subject', subjectController.handleCreateSubject);
    router.put('/api/edit-subject', subjectController.handleEditSubject);
    router.delete('/api/delete-subject', subjectController.handleDeleteSubject);
    router.post('/api/save-info-subject', subjectController.handleSaveInfoSubject);
    router.get('/api/get-detail-subject', subjectController.getDetailSubject);
    router.get('/api/get-extra-info-subject', subjectController.getExtraInfoSubject);

    router.get('/api/get-detail-subject-for-modal', subjectController.getDetailSubjectForMoldal);

    // subject schedule
    router.post('/api/create-subject-schedule', subjectController.handleCreateSubjectSchedule)
    router.get('/api/get-subject-schedule-by-month', subjectController.getCheduleByMonth)


    // student register subject 
    router.post('/api/student-register-subject', studentController.studentRegisterSubject)
    router.post('/api/verify-register-subject', studentController.verifyRegisterSubjects)

    //rest api
    return app.use('/', router);
}

module.exports = initWebRoutes;