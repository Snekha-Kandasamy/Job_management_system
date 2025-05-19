const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all jobs
router.get('/', (req, res) => {
  db.query('SELECT * FROM jobs', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Create a job
router.post('/', (req, res) => {
  const {
    title, company, location, jobType,
    salaryMin, salaryMax, deadline, description
  } = req.body;

  const sql = `INSERT INTO jobs (title, company, location, jobType, salaryMin, salaryMax, deadline, description)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [title, company, location, jobType, salaryMin, salaryMax, deadline, description], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, ...req.body });
  });
});

module.exports = router;
