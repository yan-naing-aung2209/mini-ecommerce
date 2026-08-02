import config from "@/config";
import { CartItem } from "@/types/cart";
import { OrderState } from "@/types/order";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../../generated/prisma/client";
import { setOrderLines } from "./orderLineSlice";

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
    const [orders, orderLines] = data;
    thunkAPI.dispatch(addOrder(orders));
    thunkAPI.dispatch(setOrderLines(orderLines));
  },
);

export const getOrders = createAsyncThunk("order/getOrders", async (_, thunkAPI) => {
  const response = await fetch(`${config.apiBaseUrl}/order`);
  const { msg, data } = await response.json();
  const [orders, orderLines] = data;
  thunkAPI.dispatch(setOrders(orders));
  thunkAPI.dispatch(setOrderLines(orderLines));
});

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (payload: number, thunkAPI) => {
    const response = await fetch(`${config.apiBaseUrl}/order/${payload}`, { method: "DELETE" });
    const { msg, data } = await response.json();
    const [orders, orderLines] = data;
    thunkAPI.dispatch(setOrders(orders));
    thunkAPI.dispatch(setOrderLines(orderLines));
  },
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.items = [...state.items, action.payload];
    },
    removeOrder: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrders, addOrder, removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
