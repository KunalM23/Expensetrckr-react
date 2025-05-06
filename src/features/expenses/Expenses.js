import React from 'react';
import { Typography, Box } from '@mui/material';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

const Expenses = () => {
  return (
    <>
      <Box sx={{ mb: 4, textAlign: 'center', mt: 4 }}>
        <Typography variant='h4' component='h1' color='green' gutterBottom>
          EXPENSE
        </Typography>
      </Box>
      <ExpenseForm />
      <ExpenseList />
    </>
  );
};

export default Expenses;
