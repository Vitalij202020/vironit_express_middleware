const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require("../services/userServices");
const uuid = require('uuid')


const getToken = (id, name) => {
    const payload = {id, name}
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "24h"})
}


const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const id = uuid.v4()
        const user = await userService.getUserByEmail(email)
        if(user) {
            return res.status(400).json({message: 'User with such an email has already been registered!!!'})
        }
        const hashPassword = bcrypt.hashSync(password, 5)
        const answer = await userService.addUser({id, name, email, password: hashPassword})
        res.json(answer);
    } catch (e) {
        res.status(400).json({message: 'Registration error'})
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userService.getUserByEmail(email)
        if (!user) {
            return res.status(400).json({message: `the user with the email - ${email} was not found`})
        }
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) {
            return res.status(400).json({message: `Invalid password entered`})
        }
        const token = getToken(user.id, user.name)
        return res.json({token})
    } catch (e) {
        res.status(400).json({message: 'Login error'})
    }
}

module.exports = {
    signUp,
    signIn
}
