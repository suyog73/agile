const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'suyog73',
    password: '123',
    database: 'job_applications',
});


// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/test", (req, res) => {
    res.status(200).send({status:200, "data":"Successfully tested"})
})
// Route for handling form submissions
app.post('/submit-job-details', (req, res) => {
    const { title, company, location } = req.body;
    console.log(req.body);
    const sql = 'INSERT INTO applications (title, company, location) VALUES (?, ?, ?)';
    db.query(sql, [title, company, location], (err, result) => {
        if (err) {
            console.error('Error submitting job details:', err);
            res.status(500).send('Error submitting job details');
        } else {
            console.log('Job details submitted successfully');
            res.status(200).send('Job details submitted successfully');
        }
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
