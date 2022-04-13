const express = require('express');
const router = express.Router();
const {getAllUsers, getOneUser, updateUser, deleteUser} = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')


router
    .get('/', getAllUsers)
    .get('/:id', getOneUser)
    .put('/:id', authMiddleware, updateUser)
    .delete('/:id',authMiddleware, deleteUser)

module.exports = router;