var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');

var app = express();
var redditRouter = express.Router();
var port = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client')));
app.use('/api/reddit', redditRouter);
require('./routes/routes.js')(redditRouter);

app.all('/*', function(req, res, next) {
  res.redirect('/');
});

app.listen(port, function() {
  console.log("Reddit Reader is listening on", port);
});

exports = module.exports = app;