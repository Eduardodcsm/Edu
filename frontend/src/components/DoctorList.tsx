import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Box, Fade, Grow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { Dentist } from '../types/Dentist';

interface DentistListProps {
  onEdit: (dentist: Dentist) => void;
  onDelete: (id: number) => void;
}

const DentistList: React.FC<DentistListProps> = ({ onEdit, onDelete }) => {
  const [dentists, setDentists] = useState<Dentist[]>([]);

  useEffect(() => {
    // Mock data for now
    const mockDentists: Dentist[] = [
      { id: 1, name: 'Dr. John Doe', specialty: 'Orthodontics' },
      { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatric Dentistry' },
    ];
    setDentists(mockDentists);
  }, []);

  const handleDeleteClick = (id: number) => {
    onDelete(id);
  };

  const handleEditClick = (dentist: Dentist) => {
    onEdit(dentist);
  };

  return (
    <Box sx={{ mt: 3, p: 3, border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Dentist List
      </Typography>
      <List>
        {dentists.map((dentist, index) => (
          <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 500 * index }}>
            <ListItem
              key={dentist.id}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(dentist)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(dentist.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
              sx={{ borderBottom: '1px solid #eee' }}
            >
              <ListItemText
                primary={dentist.name}
                secondary={dentist.specialty}
              />
            </ListItem>
          </Grow>
        ))}
      </List>
    </Box>
  );
};

export default DentistList;
