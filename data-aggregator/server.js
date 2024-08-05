const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'train_api'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.use(express.json());

app.post('/gps-data', (req, res) => {
    const { train_id, latitude, longitude, timestamp } = req.body;
    const query = 'INSERT INTO gps_data (train_id, latitude, longitude, timestamp) VALUES (?, ?, ?, ?)';
    connection.query(query, [train_id, latitude, longitude, timestamp], (err, results) => {
        if (err) throw err;
        res.status(201).send(`Data added with ID: ${results.insertId}`);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
