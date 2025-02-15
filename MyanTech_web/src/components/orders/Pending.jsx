import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { Table, Button, Drawer, Pagination } from 'antd';
import { AiOutlineArrowRight, AiOutlineArrowUp } from "react-icons/ai";
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../SearchForm';
import OrderDetail from '../../pages/Order/OrderDetail';

const Pending = ({activeKey}) => {
    const [orders, setOrders] = useState([]);
    const [shops, setShops] = useState([]);
    const [openOrder, setOpenOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/order/list?shopName=PENDING&invoiceNo=PENDING&orderStatus=PENDING`);
                console.log(response.data);
                
                setOrders(response.data);
            } catch (error) { 
                console.error("Error fetching orders:", error);
            }
        };

        if (activeKey === '6') {
            fetchOrders();
          }
    }, [activeKey]);

    const exportToExcel = () => {
        const dataForExcel = orders.map(order => {
            const shop = shops.find(s => s.id === order.shop_id);
            return {
                'Invoice No': order.invoice_no,
                'Shop Name': shop ? shop.shop_name : 'Unknown',
                'Total Quantity': order.products.reduce((sum, product) => sum + product.quantity, 0),
                'Total Price': order.products.reduce((sum, product) => sum + product.subtotal, 0),
                'Order Status': order.order_status,
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
        XLSX.writeFile(workbook, 'orders.xlsx');
    };

    const columns = [
        { title: 'Invoice No', dataIndex: 'invoiceNo', key: 'invoice_no' },
        { 
            title: 'Shop Name', 
            dataIndex: 'shopName', 
            key: 'shopName',
            // render: (shop_id) => shops.find(shop => shop.id === shop_id)?.shop_name || 'Unknown'
        },
        { 
            title: 'Total Quantity', 
            key: 'total_quantity',
            render: (_, order) => order.products.reduce((sum, product) => sum + product.qty, 0)
        },
        { 
            title: 'Total Price', 
            key: 'total_price',
            render: (_, order) => order.products.reduce((sum, product) => sum + product.subTotal, 0)
        },
        { title: 'Order Status', dataIndex: 'orderStatus', key: 'orderStatus' },
        {
            title: 'Details',
            key: 'details',
            render: (_, order) => (
                <AiOutlineArrowRight className="cursor-pointer" onClick={() => setOpenOrder(order.orderId)} />
            )
        }
    ];
    console.log(openOrder);
    
    const onSearch = async (value) =>{
      console.log(value);

      try {
         const response = await axios.get(`/order/list?shopName=${value}&invoiceNo=${value}&orderStatus=${value}`);
         console.log(response.data);
         
         setOrders(response.data);
     } catch (error) {
         console.error("Error fetching orders:", error);
     }
      
    }

    return (
        <div>
            <div className='flex items-center justify-between mb-4'>
                <SearchForm orders={orders} setOrders={setOrders} onSearch={onSearch} />
                <Button className='border border-purple-900' onClick={exportToExcel}>
                    Export to Excel <AiOutlineArrowUp className='ml-2' />
                </Button>
            </div>
            <Table 
                columns={columns} 
                dataSource={orders} 
                rowKey="id"
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: orders.length, 
                    onChange: setCurrentPage,
                }}
            />
            <Drawer
                className='relative '
                title="Order Details"
                width={600}
                onClose={() => setOpenOrder(null)}
                open={openOrder !== null}
            >
                {openOrder && <OrderDetail order={orders.find(order => order.orderId === openOrder)} />}
               { orders.find(order => order.orderId === openOrder)?.orderStatus == 'pending'&& <Button 
                    onClick={() => navigate(`/edit-order`, { state: { orderData: orders.find(order => order.orderId === openOrder) } })} 
                    className='absolute mt-3 border-2 border-yellow-600 rounded-md right-4 text-blue top-1'
                >
                    Edit Order
                </Button>}
            </Drawer>
        </div>
    );
};

export default Pending;
