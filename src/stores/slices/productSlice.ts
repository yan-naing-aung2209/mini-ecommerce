import config from "@/config";
import { ProductState } from "@/types/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ProductState = {
  items: [],
  singleItem: null,
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk("product/getProducts", async (_, thunkAPI) => {
  const response = await fetch(`${config.apiBaseUrl}/product`);
  const { msg, data } = await response.json();
  thunkAPI.dispatch(setProducts(data));
});

export const getSingleProduct = createAsyncThunk(
  "product/getSingleProduct",
  async (payload: number, thunkAPI) => {
    const response = await fetch(`${config.apiBaseUrl}/product/${payload}`);
    const { msg, data } = await response.json();
    thunkAPI.dispatch(setSingleProduct(data));
  },
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setSingleProduct: (state, action) => {
      state.singleItem = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProducts, setSingleProduct } = productSlice.actions;

export default productSlice.reducer;
