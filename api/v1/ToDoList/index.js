'use strict';

const express = require('express');
const controller = require('./controller');
// const auth = require('./../auth/controller');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', controller.createList);
router.get('/', controller.getList);
router.get('/id/:id', controller.getListById);
router.put('/', controller.updateList);
router.delete('/id/:id', controller.deleteList);

module.exports = router;
