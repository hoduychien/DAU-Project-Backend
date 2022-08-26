import express from 'express';
import homeController from '../controllers/homeController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getCRUDUser);
    router.get('/crud', homeController.getCRUD);
    router.post('/add-user', homeController.postCRUD);
    router.get('/get-user', homeController.getCRUDUser);
    router.get('/edit-user', homeController.editUser);
    router.post('/put-crud', homeController.updateUser);
    router.get('/delete-user', homeController.deleteUser);


    //rest api
    return app.use('/', router);
}

module.exports = initWebRoutes;