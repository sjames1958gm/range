const express = require('express');
const router = express.Router();

const { getPersons, addPerson } = require('../db/db_person');
const { getAgencies, addAgency } = require('../db/db_agency');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("route");
  res.render('index', { title: 'Express' });
});

router.get('/events', function(req, res, next) {
  console.log('events');
  res.render('pages/events', {});
});

router.get('/agencies', function(req, res, next) {
  console.log('agencies');
  getAgencies((err, agencies) => {
    if (err) {
      console.log(err);
      agencies = [];
    }
    res.render('pages/agencies', { agencies });
  });
});

router.post('/addagency', function(req, res, next) {
  console.log('addagency');
  let {name, addr, admin, code} = req.body;
  addAgency(name, addr, admin, code, (err) => {
    if (err) console.log(err);
    res.redirect('./agencies');
  });
});

router.get('/personnel', function(req, res, next) {
  console.log('personnel');
  getPersons((err, persons) => {
    if (err) {
      console.log(err);
      persons = [];
    }

    res.render('pages/personnel', { persons });
  });
});

router.post('/addperson', function(req, res, next) {
  console.log(req.body);
  let {name, serno, email, rank, addr} = req.body;
  addPerson(name, serno, email, rank, addr, (err) => {
    if (err) console.log(err);
    res.redirect('./personnel');
  });
});

router.get('/about', function(req, res, next) {
  console.log('about');
  res.render('pages/about', {});
});

module.exports = router;
