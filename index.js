var express = require('express');
var morgan = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('dotenv').config();

var routes = require('./routes/index');

let port = process.env.PORT | 8080;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(function(req, res) {
  console.log("app.use");
  res.sendStatus(404);
});

app.listen(port, function() {
    console.log("-------------------------------");
    console.log("server started on " + port);
});

