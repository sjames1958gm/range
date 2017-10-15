const moment = require('moment');
const { getExercisesByEventId } = require('../db/exercise');

module.exports = function(router) {

  router.get('/api/exercises/:eventid', function(req, res, next) {
    console.log(`/api/exercises/${req.params.eventid}`);
    getExercisesByEventId(req.params.eventid, (err, exercises) => {
      if (err) {
        console.log(err);
        exercises = [];
      }
      res.json(exercises);
    });
  });
}

