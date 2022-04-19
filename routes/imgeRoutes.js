const express = require('express');
const router = express.Router();
const getImage = require('../controllers/imageController')
const upload = require('../storageMulter')


router.post('/', upload.single('image'), getImage)

module.exports = router;