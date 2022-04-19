const express = require('express');
const router = express.Router();
const {getAllUsers, getOneUser, updateUser, deleteUser} = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')
const signUpValidate = require('../middleware/signUpValidate')


router
    .get('/', getAllUsers)
    .get('/:id', getOneUser)
    .put('/:id',[signUpValidate, authMiddleware], updateUser)
    .delete('/:id',authMiddleware, deleteUser)

module.exports = router;