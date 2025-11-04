import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Stack, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { dentalSpecialties } from '../constants/specialties';
import type { Dentist } from '../types/Dentist';

interface EditDentistFormProps {
  dentist: Dentist;
  onSave: (dentist: Dentist) => void;
  onCancel: () => void;
}

const EditDentistForm: React.FC<EditDentistFormProps> = ({ dentist, onSave, onCancel }) => {
  const [name, setName] = useState(dentist.name);
  const [specialty, setSpecialty] = useState(dentist.specialty);

  useEffect(() => {
    setName(dentist.name);
    setSpecialty(dentist.specialty);
  }, [dentist]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...dentist, name, specialty });
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
        Edit Dentist
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
          Save Changes
        </Button>
        <Button type="button" variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export default EditDentistForm;