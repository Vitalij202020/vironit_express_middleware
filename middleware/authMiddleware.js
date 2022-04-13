const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "The user is not logged in, please sign up"})
        }
        const checkPass = jwt.verify(token, process.env.SECRET_KEY)
        req.user = checkPass
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "The user is not logged in, please sign up"})
    }
}
