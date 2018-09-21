'use strict';

const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();
const ctrl = require('./controllers');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.get('/hello', (req, res) => {
  res.render('index', { data: [] });
});

app.get('/books', ctrl.booksGetAll);
app.get('/books/:id', ctrl.booksGetOne);
app.get('/addbook', ctrl.getBookForm);
app.post('/books', ctrl.addOneBook);
app.get('/search', ctrl.getBookSearch);


app.get('/error', (req, res) => {
  res.render('pages/error');
});

app.get('*', (req, res) => {
  res.redirect('/error');
});

app.listen(PORT, () => {
  console.log(`We are listening on port ${PORT}.`);
});
