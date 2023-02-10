var express = require('express');
var router = express.Router();
const authRouter = require("./auth")
const usersRouter = require("./users")
const projectsRouter = require("./project")
const tasksRouter = require("./task")
const checkToken = require("../middlewares/checkToken")

/* GET home page. */
router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/project', checkToken, projectsRouter)
router.use('/task', tasksRouter)

module.exports = router;