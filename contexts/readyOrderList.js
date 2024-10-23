// import { create } from 'zustand';

// const useReadyOrderList = create((set) => ({
//   readyOrders: [],
//   addReadyOrder: (order) => set(state => ({ readyOrders: [...state.readyOrders, order] })),
//   clearReadyOrderList: () => set({ readyOrders: [] }),
// }));

// export default useReadyOrderList;

import { create } from 'zustand';

const  getPersistedReadyOrders = ()=>{
  if(typeof window !== 'undefined'){
    const savedReadyOrders = localStorage.getItem('readyOrders');
    return savedReadyOrders ? JSON.parse(savedReadyOrders) : [];
  }
  return [];
};

const useReadyOrderList = create((set)=>({
  readyOrders : getPersistedReadyOrders(),

  addReadyOrder:(order) => set(state =>{
    const updatedReadyOrders = [...state.readyOrders, order];

    if(typeof window !== 'undefined'){
      localStorage.setItem('readyOrders', JSON.stringify(updatedReadyOrders));
    }

    return { readyOrders: updatedReadyOrders };
  }),

  orderTakenAway : (orderId) => set((state) => {
    const updatedReadyOrders = state.readyOrders.filter(order => order.orderId !== orderId);

    if(typeof window !== 'undefined'){
      localStorage.setItem('readyOrders', JSON.stringify(updatedReadyOrders));
    }

    return { readyOrders: updatedReadyOrders };
  }),

  clearReadyOrderList : ()=>set(()=>{
    if(typeof window !== 'undefined'){
      localStorage.removeItem('readyOrders');
    }
    return { readyOrders: [] };
  }),

}))

export default useReadyOrderList;