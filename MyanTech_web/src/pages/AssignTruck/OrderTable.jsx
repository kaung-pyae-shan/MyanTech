import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Button, Select, Modal, DatePicker, message, Tabs } from "antd";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch } from "react-redux";
import DeliveringOrders from "./DeliveringOrders";
const { TabPane } = Tabs;

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [shops, setShops] = useState([]);
   const [drivers, setDrivers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const max_load = 17;

  const [selectedDrivers, setSelectedDrivers] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const dispatch = useDispatch()
  

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
  
    const fetchDrivers= async () =>{
      try {
        const response = await axios.get(`/drivers`);
        console.log(response.data);
        
        setOrders(response.data);
    } catch (error) {
        console.error("Error fetching orders:", error);
    }
};
 
    fetchDrivers();
    fetchOrders()
  }, []);

  const handleOrderSelection = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

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

  const totalQuantity = selectedOrders.reduce((sum, orderId) => {
    const order = orders.find((o) => o.id === orderId);
    return sum + (order?.products?.reduce((acc, product) => acc + Number(product.quantity), 0) || 0);
  }, 0);

  const handleAssignTruck = async () => {
    console.log("Assigning truck...");
  
    const assignedDeli = {
      orderIds: selectedOrders,
      driver_id: selectedDrivers,
      delivery_date: deliveryDate,
    };
  
    console.log("Assign Data:", assignedDeli);
  
    try {
      const response = await axios.post("assign_truck/assign-mutiple", assignedDeli);
  
      if (response.status === 200 || response.status === 201) {
        console.log("Assignment Successful:", response.data);
  
        // Update order statuses
        for (const orderId of selectedOrders) {
          await updateStatus(orderId, "DELIVERING");
        }
  
        setModalOpen(false)// Reset state after successful assignment
        setSelectedOrders([]);
        setSelectedDrivers(null);
        setDeliveryDate(null);
        setModalOpen(false);
      }
    } catch (error) {
      console.error("Error assigning truck:", error.response ? error.response.data : error.message);
      message.error("Failed to assign truck.");
    }
  };
  
  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put("/order/status", { orderId, status: newStatus });
  
      console.log(`Order ${orderId} status updated to ${newStatus}`);
  
      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      message.error("Failed to update order status.");
    }
  };
  
  // const handleAssignTruck = async () => {
  //   if (!selectedDrivers.length || !deliveryDate) {
  //     message.error("Please select drivers and a delivery date.");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     await Promise.all(
  //       selectedOrders.map(async (orderId) => {
  //         await axios.patch(`/orders/${orderId}`, { order_status: "DELIVERING" });
  //       })
  //     );

  //     // Determine required driver count
  //     let requiredDrivers = totalQuantity > max_load ? 2 : 1;

  //     if (requiredDrivers === 2 && selectedDrivers.length < 2) {
  //       message.error("This order requires at least two drivers.");
  //       setLoading(false);
  //       return;
  //     }

  //     // Assign drivers based on requirement
  //     const assignTruckData = selectedOrders.flatMap((orderId) => {
  //       return selectedDrivers.slice(0, requiredDrivers).map((driverId, index) => ({
  //         assign_truck_id: Date.now() + index, // Unique ID
  //         order_id: orderId,
  //         driver_id: driverId,
  //         delivery_date: deliveryDate.format("YYYY-MM-DD"),
  //       }));
  //     });

  //     await axios.post("/assign_truck", assignTruckData);
  //     message.success("Trucks assigned and orders updated successfully!");

  //     setOrders((prevOrders) =>
  //       prevOrders.map((order) =>
  //         selectedOrders.includes(order.id) ? { ...order, order_status: "DELIVERING" } : order
  //       )
  //     );

  //     setModalOpen(false);
  //     setSelectedOrders([]);
  //     setSelectedDrivers([]);
  //     setDeliveryDate(null);
  //   } catch (error) {
  //     console.error("Error assigning trucks:", error);
  //     message.error("Failed to assign trucks.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
        {/* {orders.filter((order) => order.orderStatus === statusFilter).map((order) => { */}
          {/* const shop = shops.find((s) => s.id === order.shop_id);
          return ( */}
          {
            orders.map((order)=> <tr key={order.id}>
            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
              <input
                type="checkbox"
                checked={selectedOrders.includes(order.orderId)}
                onChange={() => handleOrderSelection(order.orderId)}
              />
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{order.invoiceNo}</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
              {order.shopName}
            </td>
            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
              {order.township || "Unknown"}
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
              {order.products?.reduce((sum, product) => sum + Number(product.qty), 0) || 0}
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
              {order.orderStatus}
            </td>
            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-end">
              <AiOutlineArrowRight className="cursor-pointer" />
            </td>
          </tr>)
          }
            
          {/* ); */}
        {/* })} */}
      </tbody>
    </table>
  );

  return (

    <div className="flex flex-col">
      <div className="p-4">


        <Button type="primary" onClick={fetchDrivers} disabled={selectedOrders.length === 0}>
          Assign It
        </Button>
        <div className="px-4 py-2 font-semibold bg-gray-100 border rounded-md">
          Total Quantity: {totalQuantity}
        </div>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Pending Orders" key="1">{renderOrdersTable("PENDING")}</TabPane>
        <TabPane tab="Delivering Orders" key="2"><DeliveringOrders /></TabPane>
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
          onChange={(date) => setDeliveryDate(date? date.format("YYYY-MM-DD") : null)}
        />
      </Modal>
    </div>
  );
};

export default OrderTable;
