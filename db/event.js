const mysql = require('mysql2/promise');

// +-------------+-------------+------+-----+---------+----------------+
// | Field       | Type        | Null | Key | Default | Extra          |
// +-------------+-------------+------+-----+---------+----------------+
// | id          | int(11)     | NO   | PRI | NULL    | auto_increment |
// | description | varchar(30) | YES  |     | NULL    |                |
// | location    | varchar(30) | YES  |     | NULL    |                |
// | date        | date        | YES  |     | NULL    |                |
// +-------------+-------------+------+-----+---------+----------------+

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
    return connection.query('select id,description,location,date from event');
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

module.exports.addEvent = function(description, location, date, cb) {
  // TODO: validate values
  console.log(`addEvent(${description}, ${location}, ${date}`);
  let connection;
  mysql.createConnection(config)
  .then((conn) => {
    console.log("connected");
    connection = conn;
    return connection.query("insert into event (description, location, date) values (?,?,?)", [description, location, date]);
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

module.exports.getEvent = function(id, cb) {
  console.log(`getEvent(${id})`);
  let connection;
  mysql.createConnection(config)
  .then((conn) => {
    console.log("connected");
    connection = conn;
    return connection.query(`select id,description,location,date from event where id=${id}`);
  })
  .then(([rows, field]) => {
    cb(null, rows);
    connection.end();
  })
  .catch((error) => {
    cb(error);
    if (connection) connection.end();
  })
};
