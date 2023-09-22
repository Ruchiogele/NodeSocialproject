const express = require('express');
const auth = require('../controllers/auth');
const { createSignupValidator } = require('../validator');
const { userById } = require('../controllers/user');

// const { createPost } = require('../controllers/post');

const router = express.Router()

router.post("/signup", createSignupValidator, auth.signup);
router.post("/signin", auth.signin);

//signout
router.get("/signout", auth.signout)

// Execute userByID from route containing userId
router.param("userId", userById);

module.exports = router;

