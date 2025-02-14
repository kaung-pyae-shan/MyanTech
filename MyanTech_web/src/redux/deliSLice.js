import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch orders from JSON Server
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await fetch("http://localhost:3001/orders");
  const data = await response.json();
  return Array.isArray(data) ? data : [];
});

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }, { dispatch }) => {
    await fetch(`http://localhost:3001/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    dispatch(fetchOrders());
  }
);

const deliSlice = createSlice({
  name: "orders",
  initialState: {
    deli: {
      
    },
     orders: [],
      loading: false
     },
  reducers: {
    addDeli: (state, action) =>{
      console.log(action.payload);
      
    }

  },
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
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? { ...order, status: action.payload.status } : order
        );
      });

  },
});

export default deliSlice.reducer;
