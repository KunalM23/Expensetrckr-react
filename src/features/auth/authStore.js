import { create } from "zustand";
import { loginUser, logoutUser } from "../../api/api";

const AuthStore = create((set) => ({
  userLogin: null,
  loading: false,
  error: null,

  login: async (loginData) => {
    set({ 
      loading: true, 
      error: null 
    });
    try {
      await loginUser(loginData);
      set({ 
        userLogin: loginData.email, 
        loading: false 
      }); 
    } catch (err) {
      set({ 
        error: err.message, 
        loading: false 
      });
    }
  },

  logout: async () => {
    set({
      userLogin: null
    });
    await logoutUser();
  }

}));

export default AuthStore;
