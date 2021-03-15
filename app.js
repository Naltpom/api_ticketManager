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

const auth = require('./src/middleware/auth');
const userController = require('./src/controllers/UserController');
app.post('/auth', userController.login);

const userRoute = require('./src/routes/UserRoute');
app.use('/api/users', auth, userRoute);

const companyRoute = require('./src/routes/CompanyRoute');
app.use('/api/companies', auth, companyRoute);

const applicationRoute = require('./src/routes/ApplicationRoute');
app.use('/api/applications', auth, applicationRoute);

const applicationUser = require('./src/routes/ApplicationUserRoute');
app.use('/api/application_user', auth, applicationUser);

app.post('/send/mail', mailerService);

module.exports = app;