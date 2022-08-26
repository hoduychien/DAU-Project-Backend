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

module.exports = {
    handleLogin: handleLogin,
}