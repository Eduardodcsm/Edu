const express = require('express');
const db = require('./database');

const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

app.get('/api/doctors', (req, res) => {
  const sql = 'select * from doctors';
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

app.get('/api/appointments', (req, res) => {
  const sql = 'select * from appointments';
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

app.get('/api/specialties', (req, res) => {
  const sql = 'select * from specialties';
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});