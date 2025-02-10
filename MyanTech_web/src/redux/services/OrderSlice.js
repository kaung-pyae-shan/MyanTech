import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: {
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
            state.order.shop_id = action.payload.shop_id;
            // state.order.shop = action.payload;
        },
        addProductOrder: (state, action) => {
            console.log(action.payload);
            state.order.products.push(action.payload);
        }
    }
});

export const { addOrder, addShop, addProductOrder } = orderSlice.actions;
export default orderSlice.reducer;