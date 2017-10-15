const mysql = require('mysql2/promise');

// +-------------+-------------+------+-----+---------+----------------+
// | Field       | Type        | Null | Key | Default | Extra          |
// +-------------+-------------+------+-----+---------+----------------+
// | id          | int(11)     | NO   | PRI | NULL    | auto_increment |
// | eventid     | int(11)     | YES  |     | NULL    |                |
// | shooterid   | int(11)     | YES  |     | NULL    |                |
// | description | varchar(30) | YES  |     | NULL    |                |
// | rounds      | int(11)     | YES  |     | NULL    |                |
// | weapon      | varchar(20) | NO   |     | NULL    |                |
// +-------------+-------------+------+-----+---------+----------------+

let config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  debug: false
};

module.exports.getExercisesByEventId = function(eventid, cb) {
  console.log(`getExercises(${eventid})`);
  let connection;

  mysql.createConnection(config)
  .then((conn) => {
    console.log("connected");
    connection = conn;
    return connection.query(`select exercise.id,person.name,description,rounds,weapon from exercise left join person on exercise.shooterid=person.id where eventid=${eventid} order by exercise.id`);
  })
  .then(([rows, field]) => {
    console.log(`query: ${JSON.stringify(rows)}`);
    cb(null, rows);
    connection.end();
  })
  .catch((error) => {
    cb(error, null);
    if (connection) connection.end();
  });
};

module.exports.addExercise = function(eventid, description, shooter, rounds, weapon, cb) {
  console.log(`addExercise(${eventid}, ${description}, ${shooter}, ${rounds}, ${weapon})`);
  let connection;
  mysql.createConnection(config)
  .then((conn) => {
    console.log("connected");
    connection = conn;
    return connection.query("insert into exercise (eventid, description, shooterid, rounds, weapon) values (?,?,?,?,?,?)", 
        [eventid, description, shooter, rounds, weapon]);
  })
  .then(() => {
    cb(null);
    connection.end();
  })
  .catch((error) => {
    cb(error);
    if (connection) connection.end();
  });
}


