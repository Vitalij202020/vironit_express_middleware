const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require("../services/userServices");


const getToken = (id, name) => {
    const payload = {id, name}
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "24h"})
}


const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const isUserExist = await userService.getUserByEmail(email)
        if(isUserExist.legth > 0) {
            return res.status(400).json({message: 'User with such an email has already been registered!!!'})
        }
        const hashPassword = bcrypt.hashSync(password, 5)
        const answer = await userService.createUser({name, email, password: hashPassword})
        res.send(answer)
    } catch (e) {
        res.status(400).json({message: 'Registration error'})
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const userCheckEmailExist = await userService.getUserByEmail(email)
        if (userCheckEmailExist.legth > 0) {
            return res.status(400).json({message: `the user with the email - ${email} was not found, please sign Up`})
        }
        const checkPassword = bcrypt.compareSync(password, userCheckEmailExist[0].password)
        if (!checkPassword) {
            return res.status(400).json({message: `Invalid password entered`})
        }
        const token = getToken(userCheckEmailExist[0]._id, userCheckEmailExist[0].name)
        return res.json({token})
    } catch (e) {
        res.status(400).json({message: 'Login error'})
    }
}

module.exports = {
    signUp,
    signIn
}
