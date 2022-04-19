const userService = require('../services/userServices')
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers()
    res.json(users)
}

const getOneUser = async (req, res) => {
    if (req.params.id.length === 24) {
        const found = await userService.getUserById(req.params.id)
        console.log(found)
        if (found) {
            res.json(found);
        } else {
            res.status(400).json({message: `No user with the id of ${req.params.id}`});
        }
    } else {
        res.status(400).json({message: `No user with the id of ${req.params.id}`});
    }
}

const updateUser = async (req, res) => {
    if (req.params.id.length === 24) {
        const {name, email, password} = req.body
        const user = await userService.getUserByEmail(email)
        if (user[0] && user[0]._id !== req.params.id) {
            return res.status(400).json({message: 'User with such an email has already been registered!!!'})
        }
        const hashPassword = bcrypt.hashSync(password, 5)
        const result = await userService.updateUser(req.params.id, {name, email, password: hashPassword})
        if (result) {
            res.json({message: 'User updated'});
        } else {
            res.status(400).json({message: `No user with the id of ${req.params.id}`});
        }
    } else {
        res.status(400).json({message: `No user with the id of ${req.params.id}`});
    }
}

const deleteUser = async (req, res) => {
    if (req.params.id.length === 24) {
        const answer = await userService.deleteUser(req.params.id)
        if (answer) {
            res.json({message: `User with id - ${req.params.id} deleted`});
        } else {
            res.status(400).json({message: `No user with the id of ${req.params.id}`});
        }
    } else {
        res.status(400).json({message: `No user with the id of ${req.params.id}`});
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
}
