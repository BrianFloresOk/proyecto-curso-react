var express = require('express');
var router = express.Router();
const authRouter = require("./auth")
const usersRouter = require("./users")
const projectsRouter = require("./project")
const tasksRouter = require("./task")

/* GET home page. */
router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/project', projectsRouter)
router.use('/task', tasksRouter)

module.exports = router;