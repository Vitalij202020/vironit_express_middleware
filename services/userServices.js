const User = require('../models/userModel')

class UserService {

    getUsers () {
       return User.findAll()
    }

    getUserById(id) {
        return User.findOne({where: { id }})
    }

    getUserByEmail(email) {
        return User.findOne({where: { email }})
    }

    addUser(newUser) {
        console.log(newUser.email)
        return User.create(newUser)
    }

    changeUser(id, {name, email, password}) {
        return User.update({name, email, password},{where: { id }})
    }

    deleteUser(id) {
        return User.destroy({where: { id }})
    }
}

module.exports = new UserService();
