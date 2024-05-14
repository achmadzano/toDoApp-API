'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());

// -----------------------------------------------------------------------
// api router
// -----------------------------------------------------------------------
// const JobController = require('./job/index');
// router.use('/job', JobController);

const AuthController = require('./auth/index');
router.use('/auth', AuthController); 

const ListController = require('./ToDoList/index');
router.use('/list', ListController);

module.exports = router;
