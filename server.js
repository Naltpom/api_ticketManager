require('babel-register');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const db = require("./src/models/index");

const mongoose = require("mongoose");
const { json } = require('body-parser');

mongoose
  .connect("mongodb+srv://root:root@cluster0.keede.mongodb.net/tickettest?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connection REUSSI');
    console.log(user);
    user.save()
      .then(() => console.log('user enregistré !'))
      .catch(error => console.log('Objet error !'));
    console.log(company);
    company.save()
      .then(() => {
        console.log('company enregistré !')
        application.save()
          .then(() => {
            console.log('application enregistré !')
            db.Application.find()
              .then(app => console.log(app))
              .catch(error => console.log('app list error !'))
            db.User.find()
              .then(app => console.log(app))
              .catch(error => console.log('app list error !'))
            db.Company.find()
              .then(app => console.log(app))
              .catch(error => console.log('app list error !'))
          })
          .catch(error => console.log('Objet error !'))
      })
      .catch(error => console.log('Objet error !'))
      console.log(application);


  }
  )
  .catch(err => console.error("Connection error", err));

const user = new db.User({
  email: 'test@test.test',
  password: 'password',
  family_name: 'john',
  given_name: 'doe',
  token: 'toekn',
  domain: 'doamin',
  roles: 'roles'
});

const company = new db.Company({
  name: 'this is the company name',
  slug: 'slug'
});

const application = new db.Application({
  company_id: '604bf3db6e5c9e730e08ab38',
  name: 'name of the application'
})

const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, () => {
  console.log(`Serving running at http://${hostname}:${port}/`);
});