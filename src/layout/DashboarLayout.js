import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', mt: 4 }}>
        <Sidebar />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 3,
            marginTop: '14px',
          }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
