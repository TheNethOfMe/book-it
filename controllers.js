'use strict';

const pg = require('pg');
const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
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
      res.render('show', {
        book: result.rows[0]
      });
    }
  });
}

module.exports = {
  booksGetAll,
  booksGetOne
};