require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const calendarRoutes = require('./routes/calendarRoutes')

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// ROUTES
app.use('/', calendarRoutes)

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Listening to PORT 4000 and connected to database');
        });
    })
    .catch((err) => {
        console.log(err);
    });