import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Box, Fade, Grow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Doctor } from '../types/Doctor';

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    // Mock data for now
    const mockDoctors: Doctor[] = [
      { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology' },
      { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatology' },
    ];
    setDoctors(mockDoctors);
  }, []);

  return (
    <Box sx={{ mt: 3, p: 3, border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Doctor List
      </Typography>
      <List>
        {doctors.map((doctor, index) => (
          <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 500 * index }}>
            <ListItem
              key={doctor.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
              sx={{ borderBottom: '1px solid #eee' }}
            >
              <ListItemText
                primary={doctor.name}
                secondary={doctor.specialty}
              />
            </ListItem>
          </Grow>
        ))}
      </List>
    </Box>
  );
};

export default DoctorList;
