const router = require('express').Router();
const usersModel = require('../models/users.js');


router.put('/preferences', usersModel.updatePreferences);

router.put('/editAccount', usersModel.updateAccount);
module.exports = router;
