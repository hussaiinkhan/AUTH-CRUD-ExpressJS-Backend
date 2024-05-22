const express = require('express')
const { registerUser,loginUser,infoUser } = require('../controllers/userController')
const validateToken = require('../middleware/validateTokenHandler') //since user info is private route so we will use this authentication here
const router= express.Router()

router.post('/signup',registerUser)

router.post('/login',loginUser)

router.get('/info',validateToken,infoUser)  //it first goes to the route, validates the token and then calls infoUser fnction like in left to right method

module.exports = router