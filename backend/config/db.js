const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const setupDatabase = () => {
  connection.query('CREATE DATABASE IF NOT EXISTS user_auth', (err) => {
    if (err) throw err;

    connection.query('USE user_auth', (err) => {
      if (err) throw err;

      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          first_name VARCHAR(255),
          last_name VARCHAR(255),
          email VARCHAR(255) UNIQUE,
          password VARCHAR(255),
          role ENUM('customer', 'admin'),
          is_verified BOOLEAN DEFAULT FALSE
        );
      `;

      connection.query(createTableQuery, (err) => {
        if (err) throw err;
        console.log('Database and table setup successfully!');
      });
    });
  });
};

setupDatabase();

connection.connect(err => {
    if (err) throw err;
    console.log('MySQL connected');
});

module.exports = connection;