const express = require('express');
const router = express.Router();
const {
    register,
    login,
    checked,
    sendToken,
    changePassword,
    verifyToken
} = require("../controllers/authController")

/* GET users listing. */
router
    .post('/register', register)
    .post('/login', login)
    .get('/checked', checked)
    .post('send-token', sendToken)
    .route('/reset-password')
        .get(verifyToken)
        .post(changePassword)

module.exports = router;