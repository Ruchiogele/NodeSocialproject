const express = require('express');
const { getPosts, createPost } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

const validator = require('../validator');

const router = express.Router()

router.get('/post', getPosts);
router.post("/post", requireSignin, validator.createPostValidator, createPost);

// Execute userByID from route containing userId
router.param("userId", userById)

module.exports = router;

