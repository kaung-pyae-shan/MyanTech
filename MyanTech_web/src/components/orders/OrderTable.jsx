import { Button, InputNumber, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { delProduct, updateCreateProductQty } from '../../redux/services/OrderSlice';
import { AiOutlineClose } from "react-icons/ai";

const OrderTable = () => {
    const order = useSelector(state => state.orders.order);
    const [qtyMsgs, setQtyMsgs] = useState({}); // Store messages per row
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(order);
    }, [order]);

    const handleQuantityChange = (value, record) => {
        console.log(value, record);
        if (value > record.stock) {
            setQtyMsgs(prev => ({ ...prev, [record.product_id]: 'Over Stock!' }));
        } else {
            dispatch(updateCreateProductQty({ product_id: record.product_id, quantity: value }));
            setQtyMsgs(prev => ({ ...prev, [record.product_id]: '' })); // Clear message
        }
    };

    const productDel = (id) => {
        dispatch(delProduct(id));
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
            render: (_, record) =>
                order.products.length >= 1 ? (
                    <Button className='border-0' onClick={() => productDel(record.id)}>
                        <AiOutlineClose className='font-bold text-red-600' />
                    </Button>
                ) : null,
        },
    ];

    return (
        <motion.div
            style={{ padding: "20px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <AnimatePresence>
                <Table
                    className="custom-table"
                    columns={columns}
                    dataSource={order.products.map((item, index) => ({
                        ...item,
                        animationKey: item.id || index, // Unique key for animation
                    }))}
                    rowKey="animationKey"
                    locale={{ emptyText: "No orders yet" }}
                    components={{
                        body: {
                            row: ({ children, ...props }) => (
                                <motion.tr
                                    {...props}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {children}
                                </motion.tr>
                            ),
                        },
                    }}
                />
            </AnimatePresence>
        </motion.div>
    );
};

export default OrderTable;
