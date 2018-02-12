const { getPersons, addPerson } = require('../db/person');

module.exports = function(router) {

  router.get('/persons', function(req, res, next) {
    console.log('persons');
    getPersons((err, persons) => {
      if (err) {
        console.log(err);
        persons = [];
      }
  
      res.render('pages/persons', { persons });
    });
  });

  router.get('/api/persons', function(req, res, next) {
    console.log('api/persons');
    getPersons((err, persons) => {
      if (err) {
        console.log(err);
        persons = [];
      }
  
      res.json(persons);
    });
  });
  
  router.post('/addperson', function(req, res, next) {
    console.log(req.body);
    let {email, serno, name, rank, addr} = req.body;
    addPerson(email, serno, name, rank, addr, (err) => {
      if (err) console.log(err);
      res.redirect('./persons');
    });
  });

}
  
