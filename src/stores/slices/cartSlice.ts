import { CartState } from "@/types/cart";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    resetCart: (state, action) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
