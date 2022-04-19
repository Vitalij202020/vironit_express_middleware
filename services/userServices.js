const UserModel = require('../models/userModel')

class UserService {

    async createUser (user) {
        const newUser = new UserModel(user)
        return await newUser.save()
    }

    async getAllUsers () {
        return await UserModel.find()
    }

    async getUserById(id) {
        return await UserModel.findById(id)
    }

    async getUserByEmail(email) {
        return await UserModel.find({}).where('email').equals(email)
    }


    async updateUser(id, newUser) {
        return await UserModel.findByIdAndUpdate(id, newUser, {new: true})
    }

    async deleteUser(id) {
        return await UserModel.findByIdAndDelete(id)
    }
}

module.exports = new UserService();
