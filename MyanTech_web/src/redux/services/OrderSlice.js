import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: {
        invoice_no: 0,
        shop_id: 0,
        products: []
    },
    orders: []
};

export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            console.log(action.payload);
            state.orders.push(action.payload);
        },
        addShop: (state, action) => {
            console.log(action.payload);
            state.order.invoice_no = `INV-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(1000 + Math.random() * 9000)}`;
            state.order.shop_id = action.payload.shop_id;
            // state.order.shop = action.payload;
        },
        addProductOrder: (state, action) => {
            console.log(action.payload);
            state.order.products.push(action.payload);
        },
        resetOrder : (state, action) =>{
            state.order = initialState.order;
        },
        delProduct: (state, action) => {
            state.order.products = state.order.products.filter(product => product.id !== action.payload);
        }

    }
});

export const { addOrder, addShop, addProductOrder, resetOrder, delProduct } = orderSlice.actions;
export default orderSlice.reducer;