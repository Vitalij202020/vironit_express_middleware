const multer = require('multer')
const path = require('path')
const uuid = require('uuid')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, uuid.v4() + path.extname(file.originalname))
    }
})

module.exports =  multer({storage})