const mysql = require('mysql2')


const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: '672island!',
      database: 'EMPLOYEE_DB'
    },
    console.log('Connected to the election database.')
  );

module.exports = db