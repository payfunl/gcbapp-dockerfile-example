'use strict';

const express = require('express');
const config = require('./config');
const app = express();

//add modules
const path = require('path');

//app.disable('etag');
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
//app.set('trust proxy', true);

//All view directories here
//Example: When in the /admin directory, require the route file that handles the /admin directory
app.use('/admin', require('./controllers/admin/routes.js'));

//runs when visiting root home page
app.get('/', (req, res) => {
  res.send('Welcome to Funl');
});

//shows a page. edit later. show admin panel settings
app.get('/app/settings', (req, res) => {
 //res.send('yo');
  res.sendFile(path.join(__dirname, '/views/bigcommerce/admin/form_test.html'));
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;