require('babel-register');
const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.send('Welcome');
});

app.get('/courses', (req, res) => {
  res.send('welcome to courses');
});

const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, () => {
  console.log(`Serving running at http://${hostname}:${port}/`);
});