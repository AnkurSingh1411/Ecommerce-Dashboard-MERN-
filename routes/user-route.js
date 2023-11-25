const express = require('express');
const router = express.Router()
const {findUser,registerUser,loginUser} = require('../controllers/user-controller');
const {verifyToken} = require('../middleware/verifyJwt')
router.get('/user',verifyToken,findUser)

router.post('/post',registerUser)

router.post('/login', loginUser)
module.exports = router

