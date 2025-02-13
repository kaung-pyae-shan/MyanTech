import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Button, Select, Modal, DatePicker, message, Tabs } from "antd";
import { AiOutlineArrowRight } from "react-icons/ai";
const { TabPane } = Tabs;
const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [shops, setShops] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchOrdersAndShops = async () => {
      try {
        const [ordersRes, shopsRes] = await Promise.all([
          axios.get("/orders"),
          axios.get("/shops"),
        ]);
        setOrders(ordersRes.data);
        setShops(shopsRes.data);
      } catch (error) {
        console.error("Error fetching orders or shops:", error);
        message.error("Failed to load orders and shops.");
      }
    };
    fetchOrdersAndShops();
  }, []);
  const fetchDrivers = async () => {
    try {
      const response = await axios.get("/drivers");
      setDrivers(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      message.error("Failed to load drivers.");
    }
  };
  const handleOrderSelection = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };
  const handleAssignTruck = async () => {
    if (!selectedDrivers.length || !deliveryDate) {
      message.error("Please select drivers and a delivery date.");
      return;
    }
  
    try {
      setLoading(true);
  
      // Update order status to 'DELIVERING'
      await Promise.all(
        selectedOrders.map(async (orderId) => {
          await axios.patch(`http://localhost:3001/orders/${orderId}`, {
            order_status: "DELIVERING"
          });
        })
      );
  
      // Prepare truck assignment data
      const assignTruckData = selectedOrders.map((orderId, index) => ({
        assign_truck_id: Date.now() + index, // Unique ID
        order_id: orderId,
        driver_id: selectedDrivers[index] || selectedDrivers[0], // Assign driver
        delivery_date: deliveryDate.format("YYYY-MM-DD")
      }));
  
      // Save truck assignment to JSON Server
      await axios.post("http://localhost:3001/assign_truck", assignTruckData);
  
      message.success("Trucks assigned and orders updated successfully!");
  
      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          selectedOrders.includes(order.id)
            ? { ...order, order_status: "DELIVERING" }
            : order
        )
      );
  
      // Reset selection
      setModalOpen(false);
      setSelectedOrders([]);
      setSelectedDrivers([]);
      setDeliveryDate(null);
    } catch (error) {
      console.error("Error assigning trucks:", error);
      message.error("Failed to assign trucks.");
    } finally {
      setLoading(false);
    }
  };
  
  
  const renderOrdersTable = (statusFilter) => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead style={{ background: "linear-gradient(to right, #6b39fc, #52aff0)" }}>
        <tr>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase text-start">
            <input type="checkbox" />
          </th>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase text-start">
            Invoice No
          </th>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase text-end">
            Shop Name
          </th>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase text-start">
            Total Quantity
          </th>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase text-start">
            Order Status
          </th>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase text-end">
            Details
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {orders
          .filter((order) => order.order_status === statusFilter)
          .map((order) => {
            const shop = shops.find((s) => s.id === order.shop_id);
            return (
              <tr key={order.id}>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleOrderSelection(order.id)}
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {order.invoice_no}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {shop?.shop_name || "Unknown"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {order.township_name || "Unknown"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {(order.products || []).reduce((sum, product) => sum + Number(product.quantity), 0)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {order.order_status || "PENDING"}
                </td>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-end">
                  <AiOutlineArrowRight className="cursor-pointer" />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
  return (
    <div className="flex flex-col shadow-md">
      <div className="p-4">
        <Button type="primary" onClick={fetchDrivers} disabled={selectedOrders.length === 0}>
          Assign It
        </Button>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="PENDING Orders" key="1">
          {renderOrdersTable("PENDING")}
        </TabPane>
        <TabPane tab="DELIVERING Orders" key="2">
          {renderOrdersTable("DELIVERING")}
        </TabPane>
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
          mode="multiple"
          style={{ width: "100%", marginBottom: 16 }}
          placeholder="Select drivers"
          onChange={(value) => setSelectedDrivers(value)}
          value={selectedDrivers} // Ensure consistency
          optionLabelProp="label" // Explicitly set label property
        >
          {drivers.map((driver) => (
            <Select.Option key={driver.driver_id} value={driver.driver_id} label={driver.driver_name}>
              {driver.driver_name} - {driver.vehicle_plate_no}
            </Select.Option>
          ))}
        </Select>
        <DatePicker
          style={{ width: "100%" }}
          placeholder="Select delivery date"
          onChange={(date) => setDeliveryDate(date)}
        />
      </Modal>
    </div>
  );
};
export default OrderTable;