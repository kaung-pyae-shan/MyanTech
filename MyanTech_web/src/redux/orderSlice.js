import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch orders
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await fetch("http://localhost:3001/orders");
  return response.json();
});

// Add new order
export const addOrder = createAsyncThunk("orders/addOrder", async (newOrder, { dispatch }) => {
  const response = await fetch("http://localhost:3001/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newOrder),
  });

  if (response.ok) {
    dispatch(fetchOrders()); // Refresh order list
  }

  return response.json();
});

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;
