require('babel-register');
const express = require('express');
const bodyParser = require('body-parser');
const mailerService = require('./src/services/MailerService');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const path = require('path');

const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

const userRoute = require('./src/routes/UserRoute');
app.use('/api/users', userRoute);

const companyRoute = require('./src/routes/CompanyRoute');
app.use('/api/companies', companyRoute);


const applicationRoute = require('./src/routes/ApplicationRoute');
app.use('/api/applications', applicationRoute);




const nodemailer = require("nodemailer");


app.post('/send/mail', mailerService);

module.exports = app;