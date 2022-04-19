const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../controllers/authController')
const signUpValidate = require('../middleware/signUpValidate')
const signIpValidate = require('../middleware/signInValidate')


router
    .post('/signup', signUpValidate, signUp)
    .post('/signin', signIpValidate, signIn)

module.exports = router;