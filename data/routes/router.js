const express = require('express');
const dbase = require('../dbConfig');
const route = express.Router();

route.use(express.json());

module.exports = route;