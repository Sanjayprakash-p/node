const express = require('express');
const mysql = require('mysql');
const cors=require('cors')
const app = express();



// Create a MySQL connection pool
const pool = mysql.createPool({
  // connectionLimit: 10,
  host: 'sql6.freemysqlhosting.net',
  user: 'sql6685687', // Replace with your MySQL username
  password: 'g9gWxeMhFe', // Replace with your MySQL password
  database: 'sql6685687',
  handshakeTimeout: 30000  // Replace with your MySQL database name
});
// app.use(cors())
  
// Route to retrieve books from the database
app.get('/books', (req, res) => {
    console.log('sucess');
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection: ' + err.stack);
      return res.status(500).send('Error getting MySQL connection');
    }

    // Query to retrieve books from the database
    const query = 'SELECT * FROM books';

    // Execute the query
    connection.query(query, (error, results) => {
      // Release the connection back to the pool
      connection.release();

      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        return res.status(500).send('Error executing MySQL query');
      }

      // Send the results as JSON response
      res.json(results);
    }); 
  });
});

const PORT = process.env.PORT || 8181;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
