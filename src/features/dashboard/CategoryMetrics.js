import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, 
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import useExpenseStore from '../expenses/expenseStore';

const CategoryMetrics = () => {
  
  const { 
      userExpenses,
      userCategories,
      getExpenses,  
      fetchCategories,
    } = useExpenseStore();

  useEffect(() => {
    getExpenses();
    fetchCategories();
  }, []);

  // Total expense per category
  const categoryData = userCategories.map((category) => {
    const totalExpense = userExpenses
      .filter(exp => Number(exp.categoryId) === Number(category.id))
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

    return {
      category: category.name,
      expense: totalExpense,
    };
  });


  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Category-wise Expenses
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Bar for Expense */}
          <Bar dataKey="expense" fill="#f44336" name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CategoryMetrics;
