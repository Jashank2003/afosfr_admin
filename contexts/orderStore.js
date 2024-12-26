import { create } from 'zustand';

// Helper function to load persisted state from localStorage
const getPersistedState = () => {
  if (typeof window !== 'undefined') {
    const savedState = localStorage.getItem('orderStore');
    return savedState
      ? JSON.parse(savedState)
      : { dailyOrderCount: 0, dailyRevenue: 0, ordersServedToday: 0 };
  }
  return { dailyOrderCount: 0, dailyRevenue: 0, ordersServedToday: 0 }; // Fallback for server-side rendering
};

const useOrderStore = create((set) => {
  const initialState = getPersistedState();

  return {
    dailyOrderCount: initialState.dailyOrderCount,
    dailyRevenue: initialState.dailyRevenue,
    ordersServedToday: initialState.ordersServedToday,

    incrementDailyOrderCount: () => {
      return set((state) => {
        const newCount = state.dailyOrderCount + 1;
        localStorage.setItem('orderStore', JSON.stringify({ ...state, dailyOrderCount: newCount }));
        return { dailyOrderCount: newCount };
      });
    },

    resetDailyOrderCount: () => {
      return set((state) => {
        const newState = { ...state, dailyOrderCount: 0 };
        localStorage.setItem('orderStore', JSON.stringify(newState));
        return { dailyOrderCount: 0 };
      });
    },

    updateRevenue: (amount) => {
      return set((state) => {
        const newRevenue = state.dailyRevenue + amount;
        localStorage.setItem('orderStore', JSON.stringify({ ...state, dailyRevenue: newRevenue }));
        return { dailyRevenue: newRevenue };
      });
    },

    resetDailyRevenue: () => {
      return set((state) => {
        const newState = { ...state, dailyRevenue: 0 };
        localStorage.setItem('orderStore', JSON.stringify(newState));
        return { dailyRevenue: 0 };
      });
    },

    // New methods for orders served today
    incrementOrdersServedToday: () => {
      return set((state) => {
        const newCount = state.ordersServedToday + 1;
        localStorage.setItem('orderStore', JSON.stringify({ ...state, ordersServedToday: newCount }));
        return { ordersServedToday: newCount };
      });
    },

    resetOrdersServedToday: () => {
      return set((state) => {
        const newState = { ...state, ordersServedToday: 0 };
        localStorage.setItem('orderStore', JSON.stringify(newState));
        return { ordersServedToday: 0 };
      });
    },
  };
});

export default useOrderStore;
