const express = require('express');
const router = express.Router();


require('./agency')(router);
require('./person')(router);
require('./event')(router);
require('./exercise')(router);
require('./eventlog')(router);

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("route");
  res.render('index', { title: 'Express' });
});

router.get('/events', function(req, res, next) {
  console.log('events');
  res.render('pages/events', {});
});

router.post('/addagency', function(req, res, next) {
  console.log('addagency');
  let {name, addr, admin, code} = req.body;
  addAgency(name, addr, admin, code, (err) => {
    if (err) console.log(err);
    res.redirect('./agencies');
  });
});

router.get('/about', function(req, res, next) {
  console.log('about');
  res.render('pages/about', {});
});

module.exports = router;
