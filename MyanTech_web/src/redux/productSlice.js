import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch products from API
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("https://api.example.com/products"); // Replace with your API URL
  return response.json();
});

// Add product to API
export const addProduct = createAsyncThunk("products/addProduct", async (product) => {
  const response = await fetch("https://api.example.com/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return response.json();
});

const productSlice = createSlice({
  name: "products",
  initialState: { products: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.products = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(addProduct.fulfilled, (state, action) => { state.products.push(action.payload); });
  },
});

export default productSlice.reducer;
