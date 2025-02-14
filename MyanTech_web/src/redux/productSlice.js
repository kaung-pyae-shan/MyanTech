import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch products from JSON Server
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    const response = await fetch("http://localhost:8081/products/all");

    // Check if the response is ok (status 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the response body as JSON
    const data = await response.json();

    console.log(data);  // Log the data to inspect it
    return data;  // Return the data so that it's available in your Redux store

  } catch (error) {
    console.error("Error", error);
    // Handle the error accordingly (e.g., return null or an empty array if needed)
    return [];
  }
});

// Add new product to JSON Server
export const addProduct = createAsyncThunk("products/add", async (newProduct, { dispatch }) => {
  try {
    console.log("Adding product:", newProduct); // Log the product data to inspect it

    const response = await fetch("http://localhost:8081/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      const data = await response.json(); // Get the new product from the server response
      dispatch(fetchProducts()); // Refresh the product list
      console.log("Product added successfully:", data);
      return data; // Return the new product to be added to the state
    } else {
      console.log("Something went wrong with adding the product");
      return null; // You can return null or an empty object if there was an error
    }
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
});


// Update existing product on JSON Server
export const updateProduct = createAsyncThunk(
  "products/update",
  async (updatedProduct, { dispatch }) => {
    console.log("Updating product:", updatedProduct); // Log the product data for debugging

    try {
      const response = await fetch(`http://localhost:8081/products/update/${updatedProduct.product_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updatedProduct.name,
          brand: updatedProduct.brand,
          type: updatedProduct.type,
          price: updatedProduct.price,
          stocck: updatedProduct.stocck, // Ensure the field name is correct
          cashback: updatedProduct.cashback,
          serialNo: updatedProduct.serialNo,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product.");
      }

      const data = await response.json();
      console.log("Product updated:", data); // Log the updated data

      // Optionally, you can dispatch another action to refetch products, but it's already handled in the reducer
      return data; // Return the updated product data
    } catch (error) {
      console.error("Error updating product:", error);
      throw error; // Propagate the error to be caught in the reducer
    }
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
        const index = state.products.findIndex((p) => p.product_id === action.payload.product_id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      });
  },
});

export default productSlice.reducer;
