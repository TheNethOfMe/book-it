'use strict';

const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();
const methodOverride = require('method-override');
const ctrl = require('./controllers');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.redirect('/books'));
app.get('/books', ctrl.booksGetAll);
app.get('/books/search', ctrl.getGoogleBooks);
app.get('/books/:id', ctrl.booksGetOne);
app.get('/addbook', ctrl.getBookForm);
app.get('/addbook/:id', ctrl.getEditForm);
app.post('/books', ctrl.addOneBook);
app.put('/books/:id', ctrl.editOneBook);
app.delete('/books/:id', ctrl.deleteOneBook);

app.get('/error', (req, res) => {
  res.render('pages/error');
});

app.get('*', (req, res) => {
  res.redirect('/error');
});

app.listen(PORT, () => {
  console.log(`We are listening on port ${PORT}.`);
});
