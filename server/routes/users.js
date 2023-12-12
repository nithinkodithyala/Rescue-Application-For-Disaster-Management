const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users");

router.post("/signup", UserController.signup); // Update this route for signup

router.post("/signin", UserController.signin);
router.post('/auth', UserController.verifyToken);
router.get(`/getuser/:id`, UserController.getUser);

module.exports = router;
