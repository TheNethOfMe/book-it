'use strict';

const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
  res.send('BOOK IT! (comming soon)');
});

app.listen(PORT, () => {
  console.log(`We are listening on port ${PORT}.`);
});