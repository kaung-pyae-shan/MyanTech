import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch products from JSON Server
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("http://localhost:3001/products");
  return response.json();
});

// Add new product to JSON Server
export const addProduct = createAsyncThunk("products/addProduct", async (newProduct, { dispatch }) => {
  const response = await fetch("http://localhost:3001/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  if (response.ok) {
    dispatch(fetchProducts()); // Refresh product list after adding
  }

  return response.json();
});

// Update existing product on JSON Server
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (updatedProduct, { dispatch }) => {
    console.log("update product id" + " " + updatedProduct.id);
    
    const response = await fetch(`http://localhost:3001/products/${updatedProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });

    const data = await response.json();
    if (response.ok) {
      dispatch(fetchProducts()); // Ensure updated data is fetched
      console.log("after update product id" + " " + updatedProduct.id);
    }

    return data; // Ensure it returns the updated product
  }
);



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
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      });
  },
});

export default productSlice.reducer;
