import { Button, InputNumber, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delEditProduct, updateProductQty } from '../../redux/services/OrderSlice';
import { AiOutlineClose } from "react-icons/ai";

const EditOrderTable = () => {
    const order = useSelector(state => state.orders.editOrders);
    const [qtyMsgs, setQtyMsgs] = useState({}); // Store messages per row

    const dispatch = useDispatch();

    console.log(order);
    

    const handleQuantityChange = (value, record) => {
        console.log(value, record);
        
        if (value > record.stock) {
            setQtyMsgs(prev => ({ ...prev, [record.product_id]: 'Over Stock!' }));
        } else {
            dispatch(updateProductQty({ product_id: record.product_id, quantity: value }));
            setQtyMsgs(prev => ({ ...prev, [record.product_id]: '' })); // Clear message
        }
    };

    const columns = [
        { title: "No.", dataIndex: "id", key: "id" },
        { title: "Product Name", dataIndex: "product_name", key: "product_name" },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            render: (text, record) => (
                <div>
                    <span className="text-red-500">{qtyMsgs[record.product_id]}</span>
                    <InputNumber
                        min={1}
                        max={record.stock}
                        status={qtyMsgs[record.product_id] ? 'warning' : ''}
                        value={record.quantity}
                        onChange={(value) => handleQuantityChange(value, record)}
                    />
                </div>
            ),
        },
        { title: "Unit Price", dataIndex: "unit_price", key: "unit_price" },
        { title: "Subtotal", dataIndex: "subtotal", key: "subtotal" },
        { title: "Remark", dataIndex: "remark", key: "remark" },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => (
                <Button className='border-0' onClick={() => dispatch(delEditProduct(record.product_id))}>
                    <AiOutlineClose className='font-bold text-red-600' />
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <Table columns={columns} dataSource={order.products} rowKey="id" locale={{ emptyText: "No orders yet" }} />
        </div>
    );
};

export default EditOrderTable;
