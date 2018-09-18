'use strict';

const express = require('express');
const pg = require('pg');
const ejs = require('ejs');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);

client.connect();
client.on('error', err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.get('/hello', (req, res) => {
  res.send('hello');
});

app.get('/books', (req, res) => {
  client.query('SELECT title, author, image_url FROM books;')
    .then((result) => {
      res.render('index', {
        data: result.rows
      });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/error');
    });
});

app.get('/error', (req, res) => {
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`We are listening on port ${PORT}.`);
});