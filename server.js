require('babel-register');
const app = require('./app');
const db = require("./src/models/index");

const mongoose = require("mongoose");
const { json } = require('body-parser');

mongoose
  .connect("mongodb+srv://root:root@cluster0.keede.mongodb.net/tickettest?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {console.log('Connection REUSSI')})
  .catch(err => console.error("Connection error", err));

const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, () => {
  console.log(`Serving running at http://${hostname}:${port}/`);
});