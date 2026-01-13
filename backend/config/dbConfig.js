const mysql2 = require("mysql2");

// Create a connection pool using the environment variables
const dbConnection = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  connectionLimit: 10,
});

// Export the promise-based version so you can use async/await in your controllers
module.exports = dbConnection.promise();
