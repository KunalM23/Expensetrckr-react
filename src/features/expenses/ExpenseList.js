import React, { useState, useEffect } from 'react';
import { 
  Accordion, AccordionSummary, AccordionDetails, AccordionActions, 
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, 
  MenuItem, Typography, IconButton, Button, Box 
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon, Edit as EditIcon, 
  Delete as DeleteIcon 
} from '@mui/icons-material';
import moment from 'moment/moment';

import useExpenseStore from './expenseStore'; 

const ExpenseAccordionList = () => {
  const { 
    userExpenses, 
    fetchCategories,
    userCategories,
    getExpenses, 
    deleteExpenses, 
    updateExpenses 
  } = useExpenseStore();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editedExpense, setEditedExpense] = useState({ 
      note: '', 
      amount: '', 
      categoryId: '' 
    });

  useEffect(() => {
    getExpenses();
    fetchCategories();
  }, []);

  // Grouped expenses 
  const groupExpensesByDate = (expenses) => {
    const grouped = {};
    expenses.forEach((expense) => {
      const date = expense.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(expense);
    });
    return grouped;
  };

  // Total expenses
  const calculateTotal = (expenses) => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

  // Edit modal
  const handleOpenEditModal = (expense) => {
    setEditedExpense(expense);
    setSelectedExpense(expense);
    setOpenEditModal(true);
  };

  // Confirm modal
  const handleOpenDeleteConfirm = (expense) => {
    setSelectedExpense(expense);
    setOpenDeleteModal(true);
  };

  // Handle the editing of an expense
  const handleEditExpense = () => {
    if (selectedExpense) {
      updateExpenses(selectedExpense.id, editedExpense);
    }
    setOpenEditModal(false);
  };

  // Handle the deletion of an expense
  const handleDeleteExpense = () => {
    if (selectedExpense) {
      deleteExpenses(selectedExpense.id);
    }
    setOpenDeleteModal(false);
  };

  const groupedExpenses = groupExpensesByDate(userExpenses || []);
 
  return (
    <>
      <Box>
        {Object.keys(groupedExpenses).map((date) => (
          <Accordion 
            key={date}
            sx={{ 
              my: 1
             }}
          >
            <AccordionSummary 
              sx={{ 
                justifyContent: "flex-start", 
                px: 3, 
                pb: 1, 
              }} 
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: "primary.main" 
                }}
              >
                Date - {moment(date).format('DD-MM-YYYY')}
              </Typography>
            </AccordionSummary>

            <AccordionDetails 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column' 
              }}
            >
              {groupedExpenses[date].map((expense) => {
                const matchedCategory = userCategories.find(
                  cat => Number(cat.id) === Number(expense.categoryId)
                );
              
                return (
                  <Box 
                    key={expense.id} 
                    sx={{ 
                      marginBottom: '15px', 
                      display: 'flex', 
                      flexDirection: 'row', 
                      justifyContent: 'space-between' 
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, mb: '5px' }}>{expense.note}</Typography>
                      <Typography sx={{ fontSize: '12px', fontWeight: 500, mb: '5px' }}>Amount: {expense.amount}</Typography>
                      <Typography sx={{ fontSize: '12px', fontWeight: 500, mb: '5px' }}>
                        Category: {matchedCategory ? matchedCategory.name : 'Unknown'}
                      </Typography>
                      <Typography sx={{ fontSize: '12px', fontWeight: 500, mb: '5px' }}>Date: {moment(expense.date).format('DD-MM-YYYY')}</Typography>
                    </Box>
              
                    <Box sx={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                      <IconButton color="primary" onClick={() => handleOpenEditModal(expense)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleOpenDeleteConfirm(expense)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })}
            </AccordionDetails>

            <AccordionActions 
              sx={{ 
                justifyContent: "flex-end", 
                px: 3, 
                pb: 2 
              }}>
              <Typography   
                variant="subtitle1" 
                sx={{ 
                  color: "primary.main" 
                }}>
                Total: ₹{calculateTotal(userExpenses || [])}
              </Typography>
            </AccordionActions>
          </Accordion>
        ))}
      </Box>

      {/* Edit expense */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Expense</DialogTitle>

        <DialogContent>
          <TextField
            label="Note"
            fullWidth
            margin="dense"
            value={editedExpense.note}
            onChange={(e) =>
              setEditedExpense({ ...editedExpense, note: e.target.value })
            }
          />
          <TextField
            label="Amount"
            fullWidth
            margin="dense"
            value={editedExpense.amount}
            onChange={(e) =>
              setEditedExpense({ ...editedExpense, amount: e.target.value })
            }
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={editedExpense.date}
            onChange={(e) =>
              setEditedExpense({ ...editedExpense, date: e.target.value })
            }
          />
          
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              value={editedExpense.categoryId}
              label="Category"
              onChange={(e) =>
                setEditedExpense({ ...editedExpense, categoryId: e.target.value })
              }
            >
              {userCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditExpense}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete expense */}
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this expense?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteExpense}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExpenseAccordionList;
