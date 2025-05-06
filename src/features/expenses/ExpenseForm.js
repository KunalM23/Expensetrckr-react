import React, { useState, useEffect } from "react";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Typography, TextField, Button, Box, 
  FormControl, InputLabel, Select, MenuItem 
} from "@mui/material";

import useExpenseStore from "./expenseStore";

const ExpenseForm = () => {
  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [expenseForm, setExpenseForm] = useState({
    id: "",
    amount: "",               
    categoryId: "",          
    note: "",                
    date: ""                
  });
  
  const { 
    fetchCategories, 
    addCategories, 
    userCategories, 
    getExpenses, 
    addExpenses, 
    userExpenses 
  } = useExpenseStore();

  useEffect(() => {
    fetchCategories();
    getExpenses();
  },[]);

  // Save category 
  const handleSaveCategory = async () => {
    if (!newCategoryName.trim()) {
      console.error("Category name is required");
      return;
    }
    const newId = userCategories.length + 1;
    const newCategory = {
      id: String(newId),
      name: newCategoryName
    };
    const success = await addCategories(newCategory);
    if(success) {
      console.log('Category created successfully');
    }
    setNewCategoryName("");
    setOpenCategoryModal(false);
    fetchCategories(); 
  };

  // Save expense
  const handleSaveExpense = async () => {
    if (!expenseForm.note || !expenseForm.categoryId || !expenseForm.date || !expenseForm.amount) {
      console.log('All fields are required');
      return;
    }
    
    if (Number(expenseForm.amount) <= 0) {
      console.log("Amount must be greater than 0");
      return;
    }

    const expenseData = {
      ...expenseForm,
      id: String(userExpenses.length + 1), 
      amount: Number(expenseForm.amount),
    };

    await addExpenses(expenseData);
    setExpenseForm({
      amount: "",
      categoryId: "",
      note: "",
      date: "",
    });
    getExpenses(); 
  };
  

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          my: 4
        }}
      >
        <TextField
          label="Expense Title"
          variant="outlined"
          fullWidth
          required
          value={expenseForm.note}
          onChange={(e) => setExpenseForm({ ...expenseForm, note: e.target.value })}
        />

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={expenseForm.categoryId}
            label="Category"
            required
            onChange={(e) => setExpenseForm({ ...expenseForm, categoryId: e.target.value })}
          >
            {userCategories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Date"
          type="date"
          value={expenseForm.date}
          onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
          fullWidth
          required
          InputLabelProps={{
            shrink: true
          }}
        />

        <TextField
          label="Amount"
          variant="outlined"
          fullWidth
          required
          value={expenseForm.amount}
          onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
        />

        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={handleSaveExpense}
        >
          Add Expense
        </Button>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setOpenCategoryModal(true)}
        >
          Create Category
        </Button>
      </Box>

      {/* Category modal */}
      <Dialog open={openCategoryModal} onClose={() => setOpenCategoryModal(false)}>
        <DialogTitle>
          <Typography>Create New Category</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            variant="outlined"
            margin="dense"
            fullWidth
            required
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategoryModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveCategory}>
            Save Category
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExpenseForm;
