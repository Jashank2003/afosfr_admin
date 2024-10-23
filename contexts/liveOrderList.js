import { create } from 'zustand';

// Helper function to load persisted state from localStorage
const getPersistedOrders = () => {
  if (typeof window !== 'undefined') {
    const savedOrders = localStorage.getItem('liveOrders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  }
  return [];
};

const useLiveOrderList = create((set) => ({
  orders: getPersistedOrders(), // Initialize with persisted orders

  setOrders: (newOrder, localcount) => set((state) => {
    const updatedOrders = [...state.orders, { ...newOrder, ordernum: localcount }];
    // Persist updated orders in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('liveOrders', JSON.stringify(updatedOrders));
    }
    return { orders: updatedOrders };
  }),

  resetLiveOrderList: () => set(() => {
    // Clear orders in both Zustand and localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('liveOrders');
    }
    return { orders: [] };
  }),

  readyOrderOf: (orderId) => set((state) => {
    const updatedOrders = state.orders.filter(order => order.orderId !== orderId);
    
    // Persist updated orders in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('liveOrders', JSON.stringify(updatedOrders));
    }
    return { orders: updatedOrders };
  }),
  
}));

export default useLiveOrderList;
