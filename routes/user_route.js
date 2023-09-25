const express = require('express');
const { requireSignin } = require('../controllers/auth');
const { userById, allUsers, getUser, userUpdate, deleteUser} = require('../controllers/user');


const router = express.Router();


router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, userUpdate);
router.delete("/user/:userId", requireSignin, deleteUser);





// Execute userByID from route containing userId
// with param being a route event listener.
router.param("userId", userById);

module.exports = router;

