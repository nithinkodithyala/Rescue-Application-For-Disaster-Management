// routes/userRoute.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/user-data', userController.getUserData);

module.exports = router;
