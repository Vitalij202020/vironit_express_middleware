require('dotenv').config()
const express = require('express');
const userRoutes = require('./routes/usersRoutes')
const authRouter = require('./routes/authRouter')
const imageRoutes = require('./routes/imgeRoutes')
const mongoose = require('mongoose')
const models = require('./models/userModel')


const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Users API Routes
app.use('/', userRoutes);
app.use('/api', authRouter);
app.use('/image', imageRoutes);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECT_DB).then(() => {
    console.log("Connected to DB!!!")
    app.listen(PORT, () => console.log(`server started on port - ${PORT} `))
}).catch(() => {
    console.log("Error connecting to DB")
})
