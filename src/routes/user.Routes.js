// Importing required modules and packages
const express = require("express");
const router = express.Router();
const { loginUser, signUp } = require("../controller/user.Controller");

// Endpoint for user registration
router.post("/signup", signUp);

// Endpoint for user login
router.post("/login", loginUser);

// Exporting the router for use in other modules
module.exports = router;
