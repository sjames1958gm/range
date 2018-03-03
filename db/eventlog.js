const mysql = require('mysql2/promise');

let config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  debug: false
};

module.exports.getEvents = function(cb) {
  console.log('getEvents');
  let connection;

  mysql.createConnection(config)
  .then((conn) => {
    console.log("connected");
    connection = conn;
    return connection.query(
        'select round,recordTypes.type as type,eventlog.roundstart as start, eventlog.timestamp as timestamp, exercise.description as exercise,event.description as event,person.name as shooter ' + 
        'from eventlog ' + 
        'left join exercise on eventlog.exerciseid=exercise.id ' + 
        'left join event on event.id=exercise.eventid ' +
        'left join person on person.id=exercise.shooterid ' +
        'left join recordTypes on recordTypes.recordType=eventlog.recordType ' +
        'order by start,timestamp,shooter,eventlog.round,recordTypes.recordType');
  })
  .then(([rows, field]) => {
    console.log(`query: ${JSON.stringify(rows)}`);
    cb(null, rows);
    connection.end();
  })
  .catch((error) => {
    console.log(error);
    cb(error, null);
    if (connection) connection.end();
  });
};

