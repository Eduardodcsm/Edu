import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import DentistList from '../components/DentistList';
import AddDentistForm from '../components/AddDentistForm';
import EditDentistForm from '../components/EditDentistForm'; // To be created
import type { Dentist } from '../types/Dentist';

const AdminPage: React.FC = () => {
  const [dentists, setDentists] = useState<Dentist[]>([
    { id: 1, name: 'Dr. John Doe', specialty: 'Orthodontics' },
    { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatric Dentistry' },
  ]);
  const [editingDentist, setEditingDentist] = useState<Dentist | null>(null);

  const handleAddDentist = (newDentist: Omit<Dentist, 'id'>) => {
    const id = dentists.length > 0 ? Math.max(...dentists.map(d => d.id)) + 1 : 1;
    setDentists([...dentists, { ...newDentist, id }]);
  };

  const handleUpdateDentist = (updatedDentist: Dentist) => {
    setDentists(dentists.map(d => (d.id === updatedDentist.id ? updatedDentist : d)));
    setEditingDentist(null);
  };

  const handleDeleteDentist = (id: number) => {
    setDentists(dentists.filter(d => d.id !== id));
  };

  const handleEditDentist = (dentist: Dentist) => {
    setEditingDentist(dentist);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dentist Scheduling
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        {editingDentist ? (
          <EditDentistForm dentist={editingDentist} onSave={handleUpdateDentist} onCancel={() => setEditingDentist(null)} />
        ) : (
          <AddDoctorForm onAdd={handleAddDentist} />
        )}
        <DentistList onEdit={handleEditDentist} onDelete={handleDeleteDentist} />
      </Box>
    </Box>
  );
};

export default AdminPage;
