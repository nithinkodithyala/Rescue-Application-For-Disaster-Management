import { createSlice } from "@reduxjs/toolkit";

// Retrieve stored authentication data from localStorage
const storedAuth = localStorage.getItem("auth");
const initialState = storedAuth
  ? JSON.parse(storedAuth)
  : {
      isAuthenticated: false,
      id: "",
      role: "", // Include role in the state
    };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCollectionCenter: (state, action) => {
      state.isAuthenticated = true;
      state.role = "collection";
      state.id = action.payload;
      // Store updated authentication data in localStorage
      localStorage.setItem("auth", JSON.stringify(state));
    },

    setAdmin: (state, action) => {
      state.isAuthenticated = true;
      state.role = "admin";
      state.id = action.payload;
      localStorage.setItem("auth", JSON.stringify(state));
    },

    setReliefCenter: (state, action) => {
      state.isAuthenticated = true;
      state.role = "relief";
      state.id = action.payload;
      localStorage.setItem("auth", JSON.stringify(state));
    },

    // ... (other reducers remain unchanged)

    logout: (state) => {
      state.role = "";
      state.isAuthenticated = false;
      // Clear authentication data from localStorage on logout
      localStorage.removeItem("auth");
    },
  },
});

export const {
  setCollectionCenter,
  setAdmin,
  setReliefCenter,
  // ... (other actions remain unchanged)
  logout,
} = authSlice.actions;

export default authSlice.reducer;
