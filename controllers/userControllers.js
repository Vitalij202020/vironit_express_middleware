const userService = require('../services/userServices')

const getAllUsers = async (req, res) => {
    const users = await userService.getUsers()
    res.json(users)
}

const getOneUser = async (req, res) => {
    const found = await userService.getUserById(req.params.id)
    if (found) {
        res.json(found);
    } else {
        res.status(400).json({message: `No user with the id of ${req.params.id}`});
    }
}

const updateUser = async (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({message: 'Please include a name and email!!!'})
    }
    const result = await userService.changeUser(req.params.id, req.body)
    if (result[0]) {
        res.json({message: 'User updated'});
    } else {
        res.status(400).json({message: `No user with the id of ${req.params.id}`});
    }
}

const deleteUser = async (req, res) => {
    const answer = await userService.deleteUser(req.params.id)
    console.log(answer)
    if (answer) {
        res.json({message: `User with id - ${req.params.id} deleted`});
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
