import { Button, Table } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';
import { delEditProduct, delProduct } from '../../redux/services/OrderSlice';
import { CloseOutlined } from '@ant-design/icons';
import { AiOutlineClose } from "react-icons/ai";


const EditOrderTable = () => {
    const order = useSelector(state => state.orders.editOrders);


    console.log(order);
    
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(order);
    }, [order]);

    const columns = [
        { title: "No.", dataIndex: "id", key: "id" },
        { title: "Product Name", dataIndex: "product_name", key: "product_name" },
        { title: "Quantity", dataIndex: "quantity", key: "quantity" },
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