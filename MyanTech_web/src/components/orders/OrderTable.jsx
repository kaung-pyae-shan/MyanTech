import { Button, Table } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../api/axios';

const OrderTable = () => {
    const order = useSelector(state => state.orders.order);

   useEffect(() =>{
    console.log(order);
    
   },[order])
    
//    const createProduct = async () => {
//     try {
//       const response = await axios.post('/orders', order);
  
//       console.log('Product Created:', response.data);
//     } catch (error) {
//       console.error('Error creating product:', error.response ? error.response.data : error.message);
//     }
//   };
  
//   // Call the function
//   createProduct();

    const columns = [
        { title: "No.", dataIndex: "id", key: "id" },
        { title: "Product Name", dataIndex: "product_name", key: "product_name" },
        { title: "Quantity", dataIndex: "quantity", key: "quantity" },
        { title: "Unit Price", dataIndex: "unit_price", key: "unit_price" },
        { title: "Subtotal", dataIndex: "subtotal", key: "subtotal" },
        { title: "Remark", dataIndex: "remark", key: "remark" },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <Table columns={columns} dataSource={order.products} rowKey="id" locale={{ emptyText: "No orders yet" }} />
             {/* <Button
            onClick={createProduct}
             className='px-4 py-2 mt-3 bg-button'>Create Order</Button>*/}
        </div>
    );
};

export default OrderTable;