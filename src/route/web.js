import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getCRUDUser);
    router.get('/crud', homeController.getCRUD);
    router.post('/add-user', homeController.postCRUD);
    router.get('/get-user', homeController.getCRUDUser);
    router.get('/edit-user', homeController.editUser);
    router.post('/put-crud', homeController.updateUser);
    router.get('/delete-user', homeController.deleteUser);


    // api to frontend

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-user', userController.handleCreateUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);



    router.get('/get-key', userController.handleGetKey);

    //rest api
    return app.use('/', router);
}

module.exports = initWebRoutes;