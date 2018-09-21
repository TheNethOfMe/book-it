'use strict';

const pg = require('pg');
const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
const superagent = require('superagent');
const methodOverride = require('method-override');

client.connect();
client.on('error', err => console.log(err));

function booksGetAll(req, res) {
  client.query('SELECT id, title, author, image_url FROM books;')
    .then((result) => {
      res.render('index', {
        data: result.rows
      });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/error');
    });
}

function booksGetOne(req, res) {
  let SQL = 'SELECT * FROM books WHERE id=$1';
  let values = [ req.params.id ];
  client.query(SQL, values, (err, result) => {
    if (err) {
      console.error(err);
      res.redirect('/error');
    } else {
      res.render('pages/show', {
        book: result.rows[0],
        newBook: !!req.query.newBook
      });
    }
  });
}

function getBookForm(req, res) {
  res.render('pages/new');
}

function addOneBook(req, res) {
  let SQL = 'INSERT INTO books (title, author, isbn, image_url, description) VALUES ($1, $2, $3, $4, $5) RETURNING id;';
  let values = [req.body.title, req.body.author, req.body.isbn, req.body.image_url, req.body.description];
  client.query(SQL, values, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect(`/books/${result.rows[0].id}?newBook=true`);
    }
  });
}

function getGoogleBooks (req, res) {
  superagent.get(`https://www.googleapis.com/books/v1/volumes?q=${req.query.searchType}:${req.query.search}&fields=items(volumeInfo/authors, volumeInfo/title, volumeInfo/industryIdentifiers/identifier, volumeInfo/description, volumeInfo/imageLinks/thumbnail)`)
    .end( (err, apiResponse) => {
      let resultArr = [];
      if (apiResponse.body.items.length) {
        apiResponse.body.items.forEach( book => {
          let bookObj = {
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'N/A',
            description: book.volumeInfo.description,
            isbn: parseInt(book.volumeInfo.industryIdentifiers[0].identifier),
            image_url: book.volumeInfo.imageLinks.thumbnail
          };
          resultArr.push(bookObj);
        });
      }
      res.render('pages/search-results', {data: resultArr});
    });
}

module.exports = {
  booksGetAll,
  booksGetOne,
  addOneBook,
  getBookForm,
  getGoogleBooks
};