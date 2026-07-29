import config from "@/config";
import { CartItem } from "@/types/cart";
import { OrderState } from "@/types/order";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: OrderState = {
  items: [],
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "order/setOrder",
  async (payload: CartItem[], thunkAPI) => {
    const response = await fetch(`${config.apiBaseUrl}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const { msg, data } = await response.json();

    thunkAPI.dispatch(setOrder(data));
  },
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrder } = orderSlice.actions;

export default orderSlice.reducer;
