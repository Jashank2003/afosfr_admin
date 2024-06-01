
import {create} from 'zustand';

const useCartValue = create((set,get) => ({
  cartorders: [],

  addToCart: (foodname, amount) => set((state) => {
    const existingItem = state.cartorders.find(order => order.itemName === foodname);

    if (existingItem) {
      return state; // Do nothing if the item already exists in the cart
    }

    return {
      cartorders: [...state.cartorders, { itemName: foodname, quantity: 1, amount }]
    };
  }),

  updateQuantity: (index, quantity) => set((state) => {
    const updatedcartorders = [...state.cartorders];
    updatedcartorders[index].quantity = quantity;

    if (quantity <= 0) {
      updatedcartorders.splice(index, 1); // Remove the item if the quantity is zero or less
    }

    return { cartorders: updatedcartorders };
  }),

  getTotalAmount: () => {
    const cartorders = get().cartorders;
    return cartorders.reduce((total, item) => total + item.quantity * item.amount, 0);
  },

  resetcartorders: () => set(() => ({
    cartorders: [],
    totalAmount: 0
  })),
}));

export default useCartValue;
