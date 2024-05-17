import {create} from 'zustand';
const useOrderStore = create((set) => ({
  dailyOrderCount: 0,
  incrementDailyOrderCount: () =>
    set((state) => ({ dailyOrderCount: state.dailyOrderCount + 1 })),
  resetDailyOrderCount: () => set({ dailyOrderCount: 0 }),
}));

export default useOrderStore;