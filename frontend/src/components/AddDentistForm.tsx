import React, { useState } from 'react';
import { TextField, Button, Box, Stack, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { dentalSpecialties } from '../constants/specialties';
import type { Dentist } from '../types/Dentist';

interface AddDentistFormProps {
  onAdd: (dentist: Omit<Dentist, 'id'>) => void;
}

const AddDentistForm: React.FC<AddDentistFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, specialty });
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
        Add New Dentist
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="specialty-label">Specialty</InputLabel>
          <Select
            labelId="specialty-label"
            id="specialty"
            value={specialty}
            label="Specialty"
            onChange={(e) => setSpecialty(e.target.value as string)}
            required
          >
            {dentalSpecialties.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Dentist
        </Button>
      </Stack>
    </Box>
  );
};

export default AddDentistForm;
