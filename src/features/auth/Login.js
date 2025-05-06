import React, { useState, useEffect } from "react"; 
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom"; 
import AuthStore from "./authStore";

const Login = () => {
  const navigate = useNavigate();
  const { login, userLogin: user, error, loading } = AuthStore(); 

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(loginDetails); 
  };


  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          width: 300,
          p: 3,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5">Login</Typography>

        <TextField
          required
          id="email"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={loginDetails.email}
          onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
        />

        <TextField
          required
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={loginDetails.password}
          onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
        />

        {error && (
          <Typography color="error" variant="body2">{error}</Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
