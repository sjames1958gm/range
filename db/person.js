const mysql = require('mysql2/promise');

// +---------+-------------+------+-----+---------+----------------+
// | Field   | Type        | Null | Key | Default | Extra          |
// +---------+-------------+------+-----+---------+----------------+
// | id      | int(11)     | NO   | PRI | NULL    | auto_increment |
// | name    | varchar(30) | NO   |     | NULL    |                |
// | rank    | varchar(20) | YES  |     | NULL    |                |
// | address | varchar(63) | YES  |     | NULL    |                |
// | email   | varchar(63) | NO   | UNI | NULL    |                |
// | serno   | varchar(10) | NO   | UNI | NULL    |                |
// +---------+-------------+------+-----+---------+----------------+

let config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  debug: false
};

module.exports.getPersons = function(cb) {
  console.log('getPersons');
  let connection;

  mysql.createConnection(config)
  .then((conn) => {
    console.log("connected");
    connection = conn;
    //return connection.query('select id,email,serno,name,address from person');
    return connection.query('select person.id, person.name, serno, rank, person.address, email, agency.name as agency_name from person left join agency on agency.id = person.agencyid order by person.id;');
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

module.exports.addPerson = function(email, serno, name, rank, address, cb) {
  // TODO: validate values
  console.log(`addPerson(${email}, ${serno}, ${name}, ${rank}, ${address}`);
  let connection;
  mysql.createConnection(config)
  .then((conn) => {
    console.log("connected");
    connection = conn;
    return connection.query("insert into person (email, serno, name, rank, address) values (?,?,?,?,?)", [email, serno, name, rank, address])
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


