const schema = require('../validate')


module.exports = (req, res, next) => {
    try {
        const {email, password} = req.body
        const {error} = schema.validate({name: 'unknown', email, password})
        if (error) {
           return  res.send(error.details[0].message)
        }
        next()
    } catch (e) {
        return res.status(403).json({message: "Some kind of error has occurred!!!"})
    }
}