import { create } from 'zustand';

const useReadyOrderList = create((set) => ({
  readyOrders: [],
  addReadyOrder: (order) => set(state => ({ readyOrders: [...state.readyOrders, order] })),
  clearReadyOrderList: () => set({ readyOrders: [] }),
}));

export default useReadyOrderList;
