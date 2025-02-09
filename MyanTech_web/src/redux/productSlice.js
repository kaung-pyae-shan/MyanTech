import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch products from JSON Server
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("http://localhost:3000/products");
  return response.json();
});

// Add new product to JSON Server
export const addProduct = createAsyncThunk("products/addProduct", async (newProduct, { dispatch }) => {
  const response = await fetch("http://localhost:3000/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  if (response.ok) {
    dispatch(fetchProducts()); // Refresh product list after adding
  }

  return response.json();
});

const productSlice = createSlice({
  name: "products",
  initialState: { products: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });
  },
});

export default productSlice.reducer;
