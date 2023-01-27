const express = require('express');
const router = express.Router();
const { profile } = require("../controllers/usersController")

/* GET users listing. */
router.get('/profile', profile)


module.exports = router;