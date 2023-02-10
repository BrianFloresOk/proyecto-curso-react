const express = require('express');
const router = express.Router();
const { profile } = require("../controllers/usersController")
const ckeckToken = require("../middlewares/checkToken")

/* GET users listing. */
router.get('/profile', ckeckToken, profile)


module.exports = router;