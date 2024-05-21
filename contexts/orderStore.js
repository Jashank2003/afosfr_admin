import {create} from 'zustand';
const useOrderStore = create((set) => ({
  dailyOrderCount: 0,
  incrementDailyOrderCount: () =>
    set((state) => ({ dailyOrderCount: state.dailyOrderCount + 1 })),
  resetDailyOrderCount: () => set({ dailyOrderCount: 0 }),

  dailyRevenue:0,
  updateRevenue:(amount)=> 
    set((state) => ({dailyRevenue: state.dailyRevenue + amount})),
  resetDailyRevenue: ()=>set({dailyRevenue:0})
}));

export default useOrderStore;