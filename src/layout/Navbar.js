import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import AuthStore from '../features/auth/authStore';

const Navbar = () => {
  const navigate = useNavigate();
  const { userLogin, logout } = AuthStore(); 

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Expense Tracker
        </Typography>

        {userLogin ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
