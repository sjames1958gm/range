const mysql = require('mysql2/promise');
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
    return connection.query('select email,serno,name,rank,address from person');
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

module.exports.addPerson = function(name, serno, email, rank, address, cb) {
  console.log(`addPerson(${name}, ${serno}, ${email}, ${rank}, ${address}`);
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


