import db from '../models/index'
import CRUDService from '../services/CRUDService'


let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let massage = await CRUDService.createNewUser(req.body);
    console.log(massage);
    return res.render('homePage.ejs')
}

let getCRUDUser = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('get_user.ejs', {
        dataUser: data
    })
}

let editUser = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserById(userId);

        return res.render('edit_user.ejs', {
            user: userData
        });
    }
    else {
        return res.send("User Not Found !!!");
    }
}

let updateUser = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDService.updateUserData(data);
    return res.render('get_user.ejs', {
        dataUser: allUser
    })
}
let deleteUser = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.render('homePage.ejs')
    }
    else {
        return res.send('User not Found!')
    }
}
module.exports = {
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getCRUDUser: getCRUDUser,
    editUser: editUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}