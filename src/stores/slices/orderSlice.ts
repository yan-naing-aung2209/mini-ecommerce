import config from "@/config";
import { CreateOrderPayload, DeleteOrderPayload, OrderState } from "@/types/order";
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
  async (orderPayload: CreateOrderPayload, thunkAPI) => {
    const { payload, onSuccess, onError } = orderPayload;
    try {
      const response = await fetch(`${config.apiBaseUrl}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const { msg, data } = await response.json();
      const [orders, orderLines] = data;
      thunkAPI.dispatch(addOrder(orders));
      thunkAPI.dispatch(setOrderLines(orderLines));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
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
  async (orderPayload: DeleteOrderPayload, thunkAPI) => {
    const { orderId, onSuccess, onError } = orderPayload;

    try {
      const response = await fetch(`${config.apiBaseUrl}/order/${orderId}`, { method: "DELETE" });
      const { msg, data } = await response.json();
      const [orders, orderLines] = data;
      thunkAPI.dispatch(setOrders(orders));
      thunkAPI.dispatch(setOrderLines(orderLines));
      thunkAPI.dispatch(removeOrder(orderId));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
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
    removeOrder: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== Number(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrders, addOrder, removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
