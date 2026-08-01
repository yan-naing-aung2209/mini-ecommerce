import config from "@/config";
import { CartItem } from "@/types/cart";
import { OrderState } from "@/types/order";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../../generated/prisma/client";

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

    thunkAPI.dispatch(setOrders(data));
  },
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrders } = orderSlice.actions;

export default orderSlice.reducer;
