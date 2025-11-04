import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Placeholder endpoints for Admin Dashboard (Doctors)
app.get('/api/doctors', (req, res) => {
  res.json([]);
});

app.post('/api/doctors', (req, res) => {
  res.status(201).json({ message: 'Doctor created' });
});

app.put('/api/doctors/:id', (req, res) => {
  res.json({ message: `Doctor ${req.params.id} updated` });
});

delete '/api/doctors/:id';
app.delete('/api/doctors/:id', (req, res) => {
  res.json({ message: `Doctor ${req.params.id} deleted` });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
