const router = require('express').Router();
const usersModel = require('../models/users.js');


router.put('/preferences', usersModel.update);

module.exports = router;
