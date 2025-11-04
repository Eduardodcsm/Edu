import React, { useState } from 'react';
import { TextField, Button, Box, Stack, Typography } from '@mui/material';

const AddDoctorForm: React.FC = () => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to add the new doctor will be added here
    console.log('Adding new doctor:', { name, specialty });
    setName('');
    setSpecialty('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ 
        mt: 3, 
        p: 3,
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: '#fff'
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Add New Doctor
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Specialty"
          variant="outlined"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Doctor
        </Button>
      </Stack>
    </Box>
  );
};

export default AddDoctorForm;
