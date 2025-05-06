import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

import moment from 'moment';

import useExpenseStore from '../expenses/expenseStore';

const COLORS = [
  '#4caf50', '#f44336', '#2196f3', '#ff9800', '#9c27b0', '#3f51b5', 
  '#00bcd4', '#8bc34a', '#ffc107', '#795548', '#607d8b', '#e91e63'
];

const MetricsPanel = () => {
  const { userExpenses, getExpenses } = useExpenseStore();
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    getExpenses();
  }, []);

  useEffect(() => {
    const grouped = {};

    userExpenses.forEach((expense) => {
      const month = moment(expense.date).format('MMMM');
      const amount = parseFloat(expense.amount);

      if (!grouped[month]) {
        grouped[month] = 0;
      }
      grouped[month] += amount;
    });

    const chartData = Object.entries(grouped).map(([month, total]) => ({
      name: month,
      value: total,
    }));

    setMonthlyData(chartData);
  }, [userExpenses]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Month-wise Expense Report
      </Typography>
      <PieChart width={400} height={300}>
        <Pie
          data={monthlyData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {monthlyData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </Box>
  );
};

export default MetricsPanel;
