import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: {
        invoice_no: 0,
        shop_id: 0,
        shop_name: '',
        shop_address: '',
        contact: '',
        township_id: 0,
        township_name: '',
        region_id: 0,
        region_name: '',
        order_status: 'pending',
        
        products: []
    },
    editOrders:{
        order_id: '',
        invoice_no: 0,
        shop_id: 0,
        shop_name: '',
        shop_address: '',
        contact: '',
        township_id: 0,
        township_name: '',
        region_id: 0,
        region_name: '',
        order_status: 'PENDING',
        
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
            state.order.shop_name = action.payload.shop_name;
            state.order.shop_address = action.payload.shop_address;
            state.order.township_id = action.payload.township_id;
            state.order.township_name = action.payload.township_name;
            state.order.contact = action.payload.contact;
            state.order.region_id = action.payload.region_id;
            state.order.region_name = action.payload.region_name;           
            // state.order.shop = action.payload;
        },
        oldOrder:(state, action) =>{
            console.log(action.payload);
            state.editOrders.order_id = action.payload.order_id;
            state.editOrders.invoice_no = action.payload.invoice_no;
            state.editOrders.shop_id = action.payload.shop_id;
            state.editOrders.shop_name = action.payload.shop_name;
            state.editOrders.shop_address = action.payload.shop_address;
            state.editOrders.township_id = action.payload.township_id;
            state.editOrders.township_name = action.payload.township_name;
            state.editOrders.contact = action.payload.contact;
            state.editOrders.region_id = action.payload.region_id;
            state.editOrders.region_name = action.payload.region_name;    
        },
        addProductOrder: (state, action) => {
            console.log(action.payload);
            state.order.products.push(action.payload);
            console.log(state.order.products)
        },
        updateOrder: (state, action) => {
            console.log(action.payload);
            state.editOrders.products = action.payload

            console.log();        

            //   const orderIndex = state.editOrders.findIndex(order => order.invoice_no === invoice_no)
            // state.editOrders[orderIndex] = { ...state.orders[orderIndex], ...updatedData };
            
            // const { invoice_no, updatedData } = action.payload;
            
            // if (orderIndex !== -1) {
            //     state.editOrders[orderIndex] = { ...state.editOrders[orderIndex], ...updatedData };
            // }
        },
        addProductToEdit: (state, action) =>{
            console.log(action.payload);
            
            state.editOrders.products.push(action.payload.newproducts);

        },
        
        resetOrder : (state, action) =>{
            state.order = initialState.order;
            state.editOrders = initialState.editOrders;
        },
        resetEditOrder : (state, action) =>{
            state.editOrders = initialState.editOrders;
        },
        delEditProduct: (state, action) => {
            console.log('Before deletion:', state.editOrders.products);
            
            // Filter the products based on the provided product_id (action.payload should be product_id)
            state.editOrders.products = state.editOrders.products.filter(product => product.product_id !== action.payload);
        
            console.log('After deletion:', state.editOrders.products);
        },

        delProduct: (state, action) => {
            console.log(action.payload)
            state.order.products = state.order.products.filter(product => product.id !== action.payload);
        },

        updateProductQty: (state, action) => {
            const { product_id, quantity } = action.payload;
        
            state.editOrders.products = state.editOrders.products.map(product =>
                product.product_id === product_id ? { ...product, quantity } : product
            );
        },
        updateCreateProductQty: (state, action) => {
            const { product_id, quantity } = action.payload;
        
            state.order.products = state.order.products.map(product =>
                product.product_id === product_id ? { ...product, quantity } : product
            );
        }

    }
});

export const { addOrder, addShop, addProductOrder, updateCreateProductQty, updateProductQty, resetOrder, delProduct, updateOrder, oldOrder, addProductToEdit, resetEditOrder, delEditProduct} = orderSlice.actions;
export default orderSlice.reducer;