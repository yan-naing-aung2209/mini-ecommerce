import config from "@/config";
import { ProductState } from "@/types/product";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../generated/prisma/client";

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk("product/getProducts", async (_, thunkAPI) => {
  const response = await fetch(`${config.apiBaseUrl}/product`);
  const { msg, data } = await response.json();
  thunkAPI.dispatch(setProducts(data));
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
