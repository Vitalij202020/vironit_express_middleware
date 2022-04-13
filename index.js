require('dotenv').config()
const express = require('express');
const userRoutes = require('./routes/usersRoutes')
const authRouter = require('./routes/authRouter')
const sequelize = require('./db')
const models = require('./models/userModel')


const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Users API Routes
app.use('/', userRoutes);
app.use('/api', authRouter);

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
