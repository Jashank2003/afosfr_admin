import {create} from 'zustand';

const useOrderStore = create((set) => ({
  dailyOrderCount: 1,
  incrementDailyOrderCount: () =>
    set((state) => ({ dailyOrderCount: state.dailyOrderCount + 1 })),
  resetDailyOrderCount: () => set({ dailyOrderCount: 1 }),
}));

export default useOrderStore;