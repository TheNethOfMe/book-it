'use strict';

const express = require('express');
const pg = require('pg');
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
  res.render('index', { data: [] });
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

app.get('/books/:id', (req, res) => {
  let SQL = 'SELECT * FROM books WHERE id=$1';
  let values = [ req.params.id ];
  client.query(SQL, values, (err, result) => {
    if (err) {
      console.error(err);
      res.redirect('/error');
    } else {
      res.render('show', {
        book: result.rows[0]
      });
    }
  });
});

app.get('/error', (req, res) => {
  res.render('error');
});

app.get('*', (req, res) => {
  res.redirect('/error');
});

app.listen(PORT, () => {
  console.log(`We are listening on port ${PORT}.`);
});