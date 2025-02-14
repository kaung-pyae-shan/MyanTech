import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Button, Select, Modal, DatePicker, message, Tabs } from "antd";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch } from "react-redux";
import OrderDelivering from "./DeliveringOrders";
const { TabPane } = Tabs;

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDrivers, setSelectedDrivers] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const [activeKey, setActiveKey] = useState('1')

  const dispatch = useDispatch();

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/order/list?shopName=PENDING&invoiceNo=PENDING&orderStatus=PENDING`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchDrivers = async () => {
      try {
        const response = await axios.get("/drivers");
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
        message.error("Failed to load drivers.");
      }
    };
    if (activeKey) {
      fetchOrders();
    }
  
    fetchDrivers();
  }, [activeKey]);

  const handleOrderSelection = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const totalQuantity = selectedOrders.reduce((sum, orderId) => {
    const order = orders.find((o) => o.id === orderId);
    return sum + (order?.products?.reduce((acc, product) => acc + Number(product.quantity), 0) || 0);
  }, 0);

  const handleAssignTruck = async () => {
    if (!selectedDrivers || !deliveryDate) {
      message.error("Please select drivers and a delivery date.");
      return;
    }

    const assignedDeli = {
      orderIds: selectedOrders,
      driver_id: selectedDrivers,
      delivery_date: deliveryDate,
    };

    try {
      const response = await axios.post("assign_truck/assign-mutiple", assignedDeli);

      if (response.status === 200 || response.status === 201) {
        for (const orderId of selectedOrders) {
          await updateStatus(orderId, "DELIVERING");
        }

        setModalOpen(false);
        setSelectedOrders([]);
        setSelectedDrivers(null);
        setDeliveryDate(null);
      }
    } catch (error) {
      console.error("Error assigning truck:", error.response ? error.response.data : error.message);
      message.error("Failed to assign truck.");
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put("/order/status", { orderId, status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? { ...order, orderStatus: newStatus } : order))
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      message.error("Failed to update order status.");
    }
  };

  const [items, setItems] = useState([
    {
        key: '1',
        label: 'All',
        children: ()=>renderOrdersTable('PENDING'),
      },
      {
        key: '2',
        label: 'Delivering Orders',
        children: <OrderDelivering />,
      },
    
      
])

  const renderOrdersTable = (statusFilter) => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead style={{ background: "linear-gradient(to right, #6b39fc, #52aff0)" }}>
        <tr>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase text-start">
            <input type="checkbox" />
          </th>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase text-start">Invoice No</th>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase text-end">Shop Name</th>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase text-start">Township</th>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase text-start">Total Quantity</th>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase text-start">Order Status</th>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase text-end">Details</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {orders.filter((order) => order.orderStatus === statusFilter).map((order) => (
          <tr key={order.orderId}>
            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
              <input
                type="checkbox"
                checked={selectedOrders.includes(order.orderId)}
                onChange={() => handleOrderSelection(order.orderId)}
              />
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{order.invoiceNo}</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{order.shopName}</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{order.township || "Unknown"}</td>
            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
              {order.products?.reduce((sum, product) => sum + Number(product.qty), 0) || 0}
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{order.orderStatus}</td>
            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-end">
              <AiOutlineArrowRight className="cursor-pointer" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="flex flex-col">
      <div className="p-4">
        <Button type="primary" onClick={() => setModalOpen(true)} disabled={selectedOrders.length === 0}>
          Assign It
        </Button>
        <div className="px-4 py-2 font-semibold bg-gray-100 border rounded-md">
          Total Quantity: {totalQuantity}
        </div>
      </div>
      <Tabs defaultActiveKey="1" onChange={handleTabChange} >
        <TabPane tab="Pending Orders" key="1" >{renderOrdersTable("PENDING")}</TabPane>
        <TabPane tab="Delivering Orders" key="2"><OrderDelivering activeKey={activeKey} /></TabPane>
      </Tabs>
      <Modal
        title="Assign Drivers and Set Delivery Date"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleAssignTruck}
        confirmLoading={loading}
        okText="Assign"
      >
        <Select
          style={{ width: "100%", marginBottom: 16 }}
          placeholder="Select drivers"
          onChange={(value) => setSelectedDrivers(value)}
          value={selectedDrivers}
        >
          {drivers.map((driver) => (
            <Select.Option key={driver.driver_id} value={driver.driver_id}>
              {driver.driver_name} - {driver.vehicle_plate_no}
            </Select.Option>
          ))}
        </Select>
        <DatePicker
          style={{ width: "100%" }}
          placeholder="Select delivery date"
          onChange={(date) => setDeliveryDate(date ? date.format("YYYY-MM-DD") : null)}
        />
      </Modal>
    </div>
  );
};

export default OrderTable;
