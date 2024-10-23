// src/store/useAdminDataStore.js

import { create } from 'zustand';

// Zustand store for adminData
const useAdminDataStore = create((set) => ({
  adminData: null,  // Initial state

  // Action to load adminData from localStorage and set it in the store
  setAdminDataFromLocalStorage: () => {
    const data = localStorage.getItem('adminData');
    if (data) {
      set({ adminData: JSON.parse(data) });  // Set data from localStorage to Zustand store
    }
  },
}));

export default useAdminDataStore;
