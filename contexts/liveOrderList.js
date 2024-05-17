import {create} from 'zustand';

const useLiveOrderList = create((set) => ({
    orders: [],
    setOrders: (newOrder,localcount) => set(state => ({ orders: [...state.orders, {...newOrder, ordernum:localcount}] })),
    resetLiveOrderList: () => set({ orders: [] }),
    readyOrderOf: (orderId) => set(state => ({
      orders: state.orders.filter(order => order.orderId !== orderId)
    })),
  }));
  
  export default useLiveOrderList; 