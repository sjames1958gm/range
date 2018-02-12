const moment = require('moment');
const { getEvents, addEvent, getEvent } = require('../db/event');
const { getExercisesByEventId, addExercise } = require('../db/exercise');

module.exports = function(router) {

  router.get('/events', function(req, res, next) {
    console.log('events');
    getEvents((err, events) => {
      if (err) {
        console.log(err);
        events = [];
      }

      events = events.map((e) => ({ ...e, date: moment(e.date).format("MMM D YYYY") }));
      res.render('pages/events', { events });
    });
  });

  router.get('/api/events', function(req, res, next) {
    console.log('api/events');
    getEvents((err, events) => {
      if (err) {
        console.log(err);
        events = [];
      }
      events = events.map((e) => ({ ...e, date: moment(e.date).format("MMM D YYYY") }));
      res.json(events);
    });
  });
  
  router.post('/addevent', function(req, res, next) {
    console.log(req.body);
    let {description, location, date} = req.body;
    addEvent(description, location, date, (err) => {
      if (err) console.log(err);
      res.redirect('./events');
    });
  });

  router.get('/event/:id', function(req, res, next) {
    getEvent(req.params.id, (err, event) => {
      if (err || event.length == 0) {
        console.log(err);
        res.redirect('./events');
      }
      else {
        getExercisesByEventId(req.params.id, (err, exercises) => {
          if (err) {
            console.log(err);
            exercises = [];
          }
          res.render('pages/event', { event: event[0], exercises });
        })
      }
    });
  });

  router.get('/api/event/:id', function(req, res, next) {
    getEvent(req.params.id, (err, event) => {
      console.log(event);
      if (err || event.length == 0) {
        console.log(err);
        res.json({});
      }
      else {
        res.json(event[0]);
      }
    });
  });

  router.post('/addexercise/:id', function(req, res, next) {
    console.log(req.body);
    let {description, shooter, rounds, weapon} = req.body;
    addExercise(req.params.id, description, shooter, rounds, weapon, (err) => {
      if (err) console.log(err);
      res.redirect(`/range/event/${req.params.id}`);
    });
  })
}
  
