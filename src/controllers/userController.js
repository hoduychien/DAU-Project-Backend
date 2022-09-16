import userService from '../services/userService';


let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errorCode: 1,
            message: 'Missing login information !!!'
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    // b1: check email có tồn tại trọng database hay ko
    // b2: so sánh mật khẩu người dùng
    // b3: trả về thông tin người dùng
    // b4: trả về access tokens : JWT
    return res.status(200).json({
        errorCode: userData.errorCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        return res.status(200).json({
            errorCode: 1,
            errorMessage: "Missing",
            users: []
        })
    }
    let users = await userService.getAllUser(id);
    return res.status(200).json({
        errorCode: 0,
        errorMessage: "OK",
        users
    })

}

let handleCreateUser = async (req, res) => {
    let message = await userService.createUser(req.body);
    return res.status(200).json({ message });
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUser(data);
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errorCode: 1,
            errorMessage: "Missing"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json({ message });
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateUser: handleCreateUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
}