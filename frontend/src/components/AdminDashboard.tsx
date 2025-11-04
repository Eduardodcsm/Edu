import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import DoctorList from './DoctorList';
import AddDoctorForm from './AddDoctorForm';

const AdminDashboard: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Doctor Scheduling
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <AddDoctorForm />
        <DoctorList />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
