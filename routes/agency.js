const { getAgencies, addAgency } = require('../db/agency');

module.exports = function(router) {

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

  router.get('/api/agencies', function(req, res, next) {
    console.log('/api/agencies');
    getAgencies((err, agencies) => {
      if (err) {
        console.log(err);
        agencies = [];
      }
      res.json({ agencies });
    });
  });
  
  router.get('/api/agency/:id', function(req, res, next) {
    console.log('/api/agency/' + req.params.id);
    res.json({ test: "data"});
  });
};
