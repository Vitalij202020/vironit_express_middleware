const schema = require('../validate')


module.exports = (req, res, next) => {
    try {
        const {error} = schema.validate(req.body)
        if (error) {
           return res.send(error.details[0].message)
        }
        next()
    } catch (e) {
        return res.status(403).json({message: "Some kind of error has occurred!!!"})
    }
}