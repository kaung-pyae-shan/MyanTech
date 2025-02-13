import React, { useEffect } from "react";
import { Table, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createSlice, createAsyncThunk, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { Provider } from "react-redux";

const { Option } = Select;
const API_URL = "http://localhost:3001";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
});

export const fetchDrivers = createAsyncThunk("orders/fetchDrivers", async () => {
  const response = await axios.get(`${API_URL}/drivers`);
  return response.data;
});

export const fetchTrucks = createAsyncThunk("orders/fetchTrucks", async () => {
  const response = await axios.get(`${API_URL}/assign_truck`);
  return response.data;
});

export const updateOrderStatus = createAsyncThunk("orders/updateOrderStatus", async ({ id, status }) => {
  await axios.patch(`${API_URL}/orders/${id}`, { order_status: status });
  return { id, status };
});

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [], drivers: [], assign_truck: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
      .addCase(fetchDrivers.fulfilled, (state, action) => { state.drivers = action.payload; })
      .addCase(fetchTrucks.fulfilled, (state, action) => { state.assign_truck = action.payload; })
      .addCase(fetchOrders.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const order = state.orders.find((order) => order.id === action.payload.id);
        if (order) order.order_status = action.payload.status;
      });
  },
});

const store = configureStore({ reducer: { orders: orderSlice.reducer } });

const OrdersTable = () => {
  const dispatch = useDispatch();
  const { orders, drivers, assign_truck } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchDrivers());
    dispatch(fetchTrucks());
  }, [dispatch]);

  const getDriverInfo = (orderId) => {
    const assignment = assign_truck.find((a) => Object.values(a).some((item) => item.order_id === orderId));
    if (!assignment) return { driver_name: "N/A", vehicle_plate_no: "N/A" };
    
    const truckEntry = Object.values(assignment).find((item) => item.order_id === orderId);
    if (!truckEntry) return { driver_name: "N/A", vehicle_plate_no: "N/A" };
    
    const driver = drivers.find((d) => d.driver_id === truckEntry.driver_id);
    return driver || { driver_name: "N/A", vehicle_plate_no: "N/A" };
  };

  const handleStatusChange = (value, record) => {
    dispatch(updateOrderStatus({ id: record.id, status: value }))
      .unwrap()
      .then(() => message.success("Order status updated successfully"))
      .catch(() => message.error("Failed to update order status"));
  };

  const columns = [
    { title: "Invoice No", dataIndex: "invoice_no", key: "invoice_no" },
    { title: "Shop Name", dataIndex: "shop_name", key: "shop_name" },
    { title: "Township", dataIndex: "township_name", key: "township_name" },
    { title: "Driver Name", key: "driver_name", render: (_, record) => getDriverInfo(record.id).driver_name },
    { title: "Plate No.", key: "plate_no", render: (_, record) => getDriverInfo(record.id).vehicle_plate_no },
    { title: "Status", key: "status", render: (_, record) => (
      <Select defaultValue={record.order_status} onChange={(value) => handleStatusChange(value, record)} className="w-full">
        <Option value="pending">Pending</Option>
        <Option value="in-progress">In Progress</Option>
        <Option value="DELIVERED">Delivered</Option>
      </Select>
    ) },
  ];

  return <Table columns={columns} dataSource={orders} rowKey="id" />;
};

const DriverPage = () => (
  <Provider store={store}>
    <OrdersTable />
  </Provider>
);

export default DriverPage;
