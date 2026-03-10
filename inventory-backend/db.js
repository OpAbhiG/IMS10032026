const mysql = require('mysql2');

// Create connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'asset_user',      // or 'root'
    password: 'admin@123',
    database: 'asset_management',
    port: 3306
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Connected to MySQL database!');
});

module.exports = db;
