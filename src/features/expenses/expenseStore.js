import { create } from "zustand";
import { 
  fetchCategories, 
  addCategory, 
  fetchAllExpenses, 
  addExpense, 
  updateExpense, 
  deleteExpense, 
} from "../../api/api";

const useExpenseStore = create((set, get) => ({
  userCategories: [],
  userExpenses: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    try {
      const response = await fetchCategories();
      // console.log('Category fetched in expense store -', response);
      set({ userCategories: response });
    }
    catch (error) {
      set({ error: error.message });
    }
  },

  addCategories: async (categoryData) => {
    try {
      const response = await addCategory(categoryData);
      // console.log('Category added -', response);
      set((state) => ({
        userCategories: [
          ...state.userCategories,
          response
        ],
      }));
    }
    catch (error) {
      set({ error: error.message });
    }
  },

  getExpenses: async () => {
    try {
      const response = await fetchAllExpenses();
      // console.log('Expenses fetched in expense store', response);
      set({ userExpenses: response });
    }
    catch (error) {
      set({ error: error.response });
    }
  },

  addExpenses: async (expenseData) => {
    try {
      const response = await addExpense(expenseData);
      // console.log('Expense added -', response);
      set((state) => ({
        userExpenses: [
          ...state.userExpenses, 
          response
        ]
      }));
    }
    catch (error) {
      set({ error: error.message });
    }
  },

  updateExpenses: async (id, updatedData) => {
    try {
      const updated = await updateExpense(id, updatedData);
      set((state) => ({
        userExpenses: state.userExpenses.map((exp) =>
          exp.id === id ? updated : exp
        ),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
  
  deleteExpenses: async (id) => {
    try {
      await deleteExpense(id);
      await get().getExpenses(); 
    } catch (error) {
      set({ error: error.message });
    }
  },
  
}));

export default useExpenseStore;
