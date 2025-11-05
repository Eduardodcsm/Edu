const sqlite3 = require('sqlite3');

const DBSOURCE = 'db.sqlite';

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE doctors (
      id TEXT PRIMARY KEY,
      name TEXT,
      specialty TEXT,
      color TEXT,
      status TEXT,
      licenseNumber TEXT,
      workingHoursStart TEXT,
      workingHoursEnd TEXT
    )`, (err) => {
      if (err) {
        // Table already created
      } else {
        // Table just created, creating some rows
        const insert = 'INSERT INTO doctors (id, name, specialty, color, status, licenseNumber, workingHoursStart, workingHoursEnd) VALUES (?,?,?,?,?,?,?,?)';
        db.run(insert, ['doc_001', 'Dr. Sarah Johnson', 'General Dentistry', '#4A90E2', 'Working', 'DT-2020-001', '08:00', '18:00']);
        db.run(insert, ['doc_002', 'Dr. Michael Chen', 'Endodontics', '#E24A4A', 'Working', 'DT-2021-002', '09:00', '17:00']);
      }
    });

    db.run(`CREATE TABLE appointments (
      id TEXT PRIMARY KEY,
      patientName TEXT,
      doctorId TEXT,
      specialty TEXT,
      date TEXT,
      time TEXT,
      duration INTEGER,
      status TEXT,
      type TEXT,
      patientPhone TEXT
    )`, (err) => {
      if (err) {
        // Table already created
      } else {
        // Table just created, creating some rows
        const insert = 'INSERT INTO appointments (id, patientName, doctorId, specialty, date, time, duration, status, type, patientPhone) VALUES (?,?,?,?,?,?,?,?,?,?)';
        db.run(insert, ['apt_001', 'John Smith', 'doc_001', 'General Dentistry', '2025-11-04', '09:00', 30, 'Confirmed', 'Checkup', '(555) 123-4567']);
        db.run(insert, ['apt_002', 'Maria Garcia', 'doc_002', 'Endodontics', '2025-11-04', '10:00', 45, 'Confirmed', 'Root Canal', '(555) 234-5678']);
      }
    });

    db.run(`CREATE TABLE specialties (
      id TEXT PRIMARY KEY,
      name TEXT,
      color TEXT,
      description TEXT
    )`, (err) => {
      if (err) {
        // Table already created
      } else {
        // Table just created, creating some rows
        const insert = 'INSERT INTO specialties (id, name, color, description) VALUES (?,?,?,?)';
        db.run(insert, ['spec_001', 'General Dentistry', '#4A90E2', 'General checkups and cleanings']);
        db.run(insert, ['spec_002', 'Endodontics', '#E24A4A', 'Root canal specialists']);
      }
    });
  }
});

module.exports = db;
