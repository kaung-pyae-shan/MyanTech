import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Button, Drawer, Radio, Space } from "antd";
import OrderDetail from "./OrderDetail";


const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [shops, setShops] = useState([]);

    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('right');
    const showDrawer = () => {
        setOpen(true);
    };
    const onChange = (e) => {
        setPlacement(e.target.value);
    };
    const onClose = () => {
        setOpen(false);
    };

    const orderStatus = [
        { value: "1", label: "Pending", color: "bg-yellow-100 border-yellow-500 text-yellow-700" },
        { value: "2", label: "Delivered", color: "bg-blue-100 border-blue-500 text-blue-700" },
        { value: "3", label: "Completed", color: "bg-green-100 border-green-500 text-green-700" },
    ];

    const orderManages = [
        { value: "1", label: "Cancel", color: "bg-red-100 border-yellow-500 text-red-700" },
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

    // Function to get color based on status
    const getColor = (status) => {
        const foundStatus = orderStatus.find((s) => s.value === status);
        return foundStatus ? foundStatus.color : "bg-white border-gray-300 text-gray-700";
    };

    const getOrderColor = (status) => {
        const foundStatus = orderManages.find((s) => s.value === status);
        return foundStatus ? foundStatus.color : "bg-white border-gray-300 text-gray-700";
    };

    return (
        <div className="flex flex-col shadow-md">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead style={{ background: "linear-gradient(to right, #6b39fc, #52aff0)" }}>
                                <tr>
                                    <th className="px-6 py-3 text-xs font-medium text-white uppercase text-start">Invoice No</th>
                                    <th className="px-6 py-3 text-xs font-medium text-white uppercase text-end">Shop Name</th>
                                    <th className="px-6 py-3 text-xs font-medium text-white uppercase text-start">Total Quantity</th>
                                    <th className="px-6 py-3 text-xs font-medium text-white uppercase text-start">Total Price</th>
                                    <th className="px-6 py-3 text-xs font-medium text-white uppercase text-end">Order Status</th>
                                    <th className="px-6 py-3 text-xs font-medium text-white uppercase text-end">Manage Order</th>
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
                                                {order.products.reduce((sum, product) => sum + product.quantity, 0)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {order.products.reduce((sum, product) => sum + product.subtotal, 0)}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-end">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => {
                                                        const updatedOrders = orders.map((o) =>
                                                            o.id === order.id ? { ...o, status: e.target.value } : o
                                                        );
                                                        setOrders(updatedOrders);
                                                    }}
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


                                            </td>

                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-end">
                                                

                                                <>
                                                    
                                  
                                                            <AiOutlineArrowRight className="cursor-pointer " onClick={showDrawer}/>
                                                      
                                                    
                                                    <Drawer
                                                       style={{'padding': '0'}}
                                                        title={order.invoice_no}
                                                        // placement={placement}
                                                        width={500}
                                                        onClose={onClose}
                                                        open={open}
                                                        
                                                    >
                                                        <OrderDetail order={order} />
                                                    </Drawer>
                                                </>

                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
