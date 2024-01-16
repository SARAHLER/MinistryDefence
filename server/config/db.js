const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3305,
  user: 'root',
  password: 's8538239',
  database: 'Shopping_List',
});

connection.connect((err) => {
  if (err) {
    console.error('Login error:', err.stack);
    return;
  }
  console.log('connect successfully to db with id', connection.threadId);
});

module.exports = connection;
