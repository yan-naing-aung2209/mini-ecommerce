import config from "@/config";
import { OrderLineState } from "@/types/orderLine";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderLine } from "../../../generated/prisma/client";

const initialState: OrderLineState = {
  items: [],
  loading: false,
  error: null,
};

export const getOrderLines = createAsyncThunk("orderLine/getOrderLines", async (_, thunkAPI) => {
  const response = await fetch(`${config.apiBaseUrl}/order-line`);
  const { msg, data } = await response.json();
  thunkAPI.dispatch(setOrderLines(data));
});

export const orderLineSlice = createSlice({
  name: "orderLine",
  initialState,
  reducers: {
    setOrderLines: (state, action: PayloadAction<OrderLine[]>) => {
      state.items = action.payload;
    },
    addOrderLines: (state, action: PayloadAction<OrderLine[]>) => {
      state.items = [...state.items, ...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrderLines } = orderLineSlice.actions;

export default orderLineSlice.reducer;
