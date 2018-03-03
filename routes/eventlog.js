const moment = require('moment');
const { getEvents } = require('../db/eventlog');

module.exports = function(router) {

  router.get('/eventlog', function(req, res, next) {
    console.log('eventlog');
    getEvents((err, events) => {
      if (err) {
        console.log(err);
        events = [];
      }

      //events.map((e) => { 
        //console.log(e.start);
        //console.log(typeof e.start);
        //let d = e.start.toISOString(); 
        //d = d.split("T")[0] + "T" + e.start + "Z";
        //return {...e, start: moment(d).format("MMM D YYYY HH:mm:SS") }
      //});
      console.log('events: ' + JSON.stringify(events));
      res.render('pages/eventlog', { events });
    });
  });

}
 
