import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { AiOutlineArrowRight, AiOutlineArrowUp } from "react-icons/ai";
import { Button, Drawer, Radio, Space } from "antd";
import OrderDetail from '../../pages/Order/OrderDetail';
import SearchForm from '../SearchForm';
import * as XLSX from 'xlsx';
import { Link, useNavigate } from 'react-router-dom';

const AllOrder = () => {
    const [orders, setOrders] = useState([]);
    const [shops, setShops] = useState([]);
    const [openOrder, setOpenOrder] = useState(null); // Track the order being viewed in the drawer
    const navigate = useNavigate();

    const orderStatus = [
        { value: "PENDING", label: "PENDING", color: "bg-yellow-100 border-yellow-500 text-yellow-700" },
        { value: "DELIVERED", label: "DELIVERED", color: "bg-blue-100 border-blue-500 text-blue-700" },
        { value: "CANCELED", label: "CANCELED", color: "bg-green-100 border-green-500 text-green-700" },
    ];

    const orderManages = [
        { value: "1", label: "CANCEL", color: "bg-red-100 border-yellow-500 text-red-700" },
        { value: "2", label: "Wrong", color: "bg-blue-100 border-blue-500 text-blue-700" },
        { value: "3", label: "Faulty", color: "bg-green-100 border-green-500 text-green-700" },
    ];

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("/orders");
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        const fetchShops = async () => {
            try {
                const response = await axios.get("/shops");
                setShops(response.data);
            } catch (error) {
                console.error("Error fetching shops:", error);
            }
        };

        fetchShops();
        fetchOrders();
    }, []);

    const handleEdit = (order) => {
        navigate('/edit-order', { state: { orderData: order } });
    };

    const getColor = (status) => {
        const foundStatus = orderStatus.find((s) => s.value === status);
        return foundStatus ? foundStatus.color : "bg-white border-gray-300 text-gray-700";
    };

    const handleStatusChange = async (order, newStatus) => {
        const updatedOrders = orders.map((o) =>
            o.id === order.id ? { ...o, status: newStatus } : o
        );
        setOrders(updatedOrders);
        await updateOrderStatus(order.id, newStatus);
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.patch(`/orders/${orderId}`, { order_status: newStatus });
            console.log("Order status updated", response.data);
        } catch (error) {
            console.error("Failed to update order status", error);
        }
    };

    const exportToExcel = () => {
        const dataForExcel = orders.map((order) => {
            const shop = shops.find(s => s.id === order.shop_id);
            return {
                'Invoice No': order.invoice_no,
                'Shop Name': shop ? shop.shop_name : 'Unknown',
                'Total Quantity': order.products.reduce((sum, product) => sum + product.quantity, 0),
                'Total Price': order.products.reduce((sum, product) => sum + product.subtotal, 0),
                'Order Status': orderStatus.find(status => status.value === order.order_status)?.label || order.order_status,
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
        XLSX.writeFile(workbook, 'orders.xlsx');
    };

    return (
        <>
            <div className='flex items-center justify-between'>
                {/* <SearchForm onSearch={handleSearch} /> */}
                <div className="">
                    <Button className='border border-purple-900 bg-none' type="light" onClick={exportToExcel}>
                        Export to Excel <AiOutlineArrowUp className=' text-gradient' />
                    </Button>
                </div>
            </div>
            <div className="p-1.5 min-w-full inline-block align-middle shadow-md">
                <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead style={{ background: "linear-gradient(to right, #6b39fc, #52aff0)" }}>
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium text-white uppercase text-start">Invoice No</th>
                                <th className="px-6 py-3 text-xs font-medium text-white uppercase text-end">Shop Name</th>
                                <th className="px-6 py-3 text-xs font-medium text-white uppercase text-start">Total Quantity</th>
                                <th className="px-6 py-3 text-xs font-medium text-white uppercase text-start">Total Price</th>
                                <th className="px-6 py-3 text-xs font-medium text-white uppercase text-end">Order Status</th>
                                <th className="px-6 py-3 text-xs font-medium text-white uppercase text-end"> Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order) => {
                                const shop = shops.find((s) => s.id === order.shop_id);
                                return (
                                    <tr key={order.id}>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{order.invoice_no}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                            {shop?.shop_name || "Unknown"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {order?.products?.reduce((sum, product) => sum + parseInt(product.quantity, 10), 0)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {order?.products?.reduce((sum, product) => sum + product.subtotal, 0)}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-end">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order, e.target.value)}
                                                className={`block w-full px-3 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 border ${getColor(order.status)}`}
                                            >
                                                {orderStatus.map((status) => (
                                                    <option key={status.value} value={status.value}>
                                                        {status.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-end">
                                            <AiOutlineArrowRight className="cursor-pointer " onClick={() => setOpenOrder(order.id)} />
                                            <Drawer
                                                style={{ 'padding': '0' }}
                                                title={order.invoice_no}
                                                width={600}
                                                onClose={() => setOpenOrder(null)}
                                                open={openOrder === order.id}
                                            >
                                                <div className="absolute top-2 right-3">
                                                    <button
                                                        onClick={() => handleEdit(order)}
                                                        className='inline-block px-4 py-2 border-2 border-yellow-600 rounded-md text-blue'> Edit Order</button>
                                                </div>

                                                <OrderDetail order={order} />
                                            </Drawer>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AllOrder;
