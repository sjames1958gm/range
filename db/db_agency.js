const mysql = require('mysql2/promise');
let config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  debug: false
};

module.exports.getAgencies = function(cb) {
  console.log('getAgencies');
  let connection;

  mysql.createConnection(config)
  .then((conn) => {
    console.log("connected");
    connection = conn;
    return connection.query('select id,name,address,admin,code from agency');
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

module.exports.addPerson = function(name, address, admin, code, cb) {
  console.log(`addPerson(${name}, ${address}, ${admin}, ${code}, ${address}`);
  let connection;
  mysql.createConnection(config)
  .then((conn) => {
    console.log("connected");
    connection = conn;
    return connection.query("insert into agency (name, address, admin, code) values (?,?,?,?,?)", [name, address, admin, code])
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


