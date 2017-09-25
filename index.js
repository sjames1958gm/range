var express = require('express');
var morgan = require('morgan');
var path = require('path');

require('dotenv').config();

let port = process.env.PORT | 8080;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('tiny'));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(function(req, res) {
  console.log("app.use");
  res.sendStatus(404);
});

app.listen(port, function() {
    console.log("-------------------------------");
    console.log("server started on " + port);
});

