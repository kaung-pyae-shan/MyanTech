import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { Table, Button, Drawer, Pagination, Tag, Spin, Select } from 'antd';
import { AiOutlineArrowRight, AiOutlineArrowUp } from "react-icons/ai";
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
// import SearchForm from '../SearchForm';
import OrderDetail from '../../pages/Order/OrderDetail';

const DriverTestPage = () => {
    const [orders, setOrders] = useState([]);
    const [shops, setShops] = useState([]);
    const [openOrder, setOpenOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const statusOptions = [
        { value: 'PENDING', label: 'Pending' },
        // { value: 'DELIVERING', label: 'Delivering' },
        // { value: 'DELIVERED', label: 'Delivered' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'CANCELED', label: 'Canceled' },
      ];

     
      
      const statusColors = {
        PENDING: 'orange',
        COMPLETED: 'green',
        CANCELED: 'red',
      };

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`/assign_truck/list`);
                console.log(response.data);
                
                setOrders(response.data.orders);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching orders:", error);
                setLoading(false)

            }
        };

        
        fetchOrders();
    }, [currentPage, pageSize]);

    if (loading) {
        return (
      
            <div className="flex justify-center items-center h-[500px]">
                <Spin size="large" />
            </div>
        )
      }

    //   const handleStatusChange = async (orderId, newStatus) => {
    //     try {
    //       // Send API request to update order status
    //       await axios.put(`/order/status`, { status: newStatus, orderId: orderId });
            
    //       console.log('success');
          
    //       // Update local state after successful API call
    //       setOrders(prevOrders =>
    //         prevOrders.map(order =>
    //           order.orderId === orderId ? { ...order, orderStatus: newStatus } : order
    //         )
    //       );
    //     } catch (error) {
    //       console.error("Error updating order status:", error);
    //     }
    //   };
      

    

    const columns = [
        // { title: 'Invoice No', dataIndex: 'invoiceNo', key: 'invoice_no' },
        { 
            title: 'Driver Name', 
            dataIndex: 'driver_name', 
            key: 'driver_name',
            // render: (shop_id) => shops.find(shop => shop.id === shop_id)?.shop_name || 'Unknown'
        },
        { 
            title: 'Shop Name', 
            dataIndex: 'shopName', 
            key: 'shopName',
            // render: (shop_id) => shops.find(shop => shop.id === shop_id)?.shop_name || 'Unknown'
        },
        { 
            title: 'Township Name', 
            dataIndex: 'township_name', 
            key: 'township_name',
            // render: (shop_id) => shops.find(shop => shop.id === shop_id)?.shop_name || 'Unknown'
        },
        // { 
        //     title: 'Total Quantity', 
        //     key: 'total_quantity',
        //     render: (_, order) => order.products.reduce((sum, product) => sum + product.qty, 0)
        // },
        // { 
        //     title: 'Total Price', 
        //     key: 'total_price',
        //     render: (_, order) => order.products.reduce((sum, product) => sum + product.subTotal, 0)
        // },

        // { title: 'Order Status', 
        //     dataIndex: 'delivery_status',
        //      key: 'delivery_status',
        //      render: (status, order) => (
        //         <Select
        //           value={status}
        //           onChange={(newStatus) => handleStatusChange(order.orderId, newStatus)}
        //           style={{ width: 130 }}
        //         >
        //           {statusOptions.map(option => (
        //             <Select.Option key={option.value} value={option.value}>
        //               <Tag 
        //               color={option.value == 'DELIVERING'? 'blue':
        //                 option.value == 'PENDING'? 'yellow':
        //                 option.value == 'DELIVERED'?'blue':
        //                 option.value == 'COMPLETED'?'green':
        //                 option.value == 'CANCELED' ? 'red': ''
        //               }
        //               >{option.label}</Tag>
        //             </Select.Option>
        //           ))}
        //         </Select>
        //       ),
        //      },

        // {
        //     title: 'Details',
        //     key: 'details',
        //     render: (_, order) => (
        //         <AiOutlineArrowRight className="cursor-pointer" onClick={() => setOpenOrder(order.orderId)} />
        //     )
        // }
    ];
    console.log(openOrder);
    

    return (
        <div>
            <div className='flex items-center justify-between mb-4'>
              
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
            {/* <Drawer
                className='relative '
                title="Order Details"
                width={600}
                onClose={() => setOpenOrder(null)}
                open={openOrder !== null}
            >

                {openOrder && <OrderDetail order={orders?.find(order => order.orderId === openOrder)} />}
               { orders.find(order => order.orderId === openOrder)?.orderStatus == 'PENDING'&& <Button 
                    onClick={() => navigate(`/edit-order`, { state: { orderData: orders.find(order => order.orderId === openOrder) } })} 

                    className='absolute mt-3 border-2 border-yellow-600 rounded-md right-4 text-blue top-1'
                >
                    Edit Order
                </Button>}
            </Drawer> */}
        </div>
    );
};

export default DriverTestPage;
