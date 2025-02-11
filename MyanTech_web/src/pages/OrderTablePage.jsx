import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Checkbox, Form, Select, DatePicker, message } from "antd";

const { Option } = Select;

const OrderTablePage = () => {
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    fetchOrders();
    fetchDrivers();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3001/orders");
      const data = await response.json();
      setOrders(data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await fetch("http://localhost:3001/drivers");
      const data = await response.json();
      setDrivers(data || []);
    } catch (error) {
      console.error("Failed to fetch drivers:", error);
    }
  };

  const handleDriverChange = (driverId) => {
    const selectedDriver = drivers.find(driver => driver.driver_id === driverId);
    if (selectedDriver) {
      form.setFieldsValue({ vehicle_plate_no: selectedDriver.vehicle_plate_no });
    }
  };

  const handleBulkAssignClick = () => {
    if (selectedOrders.length === 0) {
      message.warning("Please select at least one order.");
      return;
    }
    setIsModalVisible(true);
  };

  const handleAssignTruck = async (values) => {
    try {
      const assignRequests = selectedOrders.map(async (orderId) => {
        const assignData = {
          order_id: orderId,
          driver_id: values.driver_id,
          vehicle_plate_no: values.vehicle_plate_no,
          delivery_date: values.delivery_date.format("YYYY-MM-DD"),
        };

        await fetch(`http://localhost:3001/assign_truck`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(assignData),
        });

        await fetch(`http://localhost:3001/orders/${orderId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Assigned" }),
        });
      });

      await Promise.all(assignRequests);
      message.success("Truck assigned to selected orders successfully!");
      setIsModalVisible(false);
      form.resetFields();
      setSelectedOrders([]);
      fetchOrders();
    } catch (error) {
      console.error("Failed to assign truck:", error);
      message.error("Failed to assign the truck.");
    }
  };

  const handleCheckboxChange = (e, orderId) => {
    if (e.target.checked) {
      setSelectedOrders((prev) => [...prev, orderId]);
    } else {
      setSelectedOrders((prev) => prev.filter((id) => id !== orderId));
    }
  };

  const columns = [
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <Checkbox
          checked={selectedOrders.includes(record.id)}
          onChange={(e) => handleCheckboxChange(e, record.id)}
        />
      ),
    },
    {
      title: "Invoice No",
      dataIndex: "invoice_no",
      key: "invoice_no",
    },
    {
      title: "Shop Name",
      dataIndex: "shop_id",
      key: "shop_id",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text, record) => `${text}, ${record.region}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Select defaultValue={status || "Pending"} style={{ width: 120 }}>
          <Option value="Pending">Pending</Option>
          <Option value="Processing">Processing</Option>
          <Option value="Shipped">Shipped</Option>
          <Option value="Delivered">Delivered</Option>
        </Select>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order List</h2>
      <div style={{ marginBottom: "16px" }}>
        <Button type="primary" onClick={handleBulkAssignClick}>
          Bulk Assign Truck
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Assign Truck"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAssignTruck} layout="vertical">
          <Form.Item
            name="driver_id"
            label="Driver Name"
            rules={[{ required: true, message: "Please select a driver" }]}
          >
            <Select placeholder="Select Driver" onChange={handleDriverChange}>
              {drivers.map(driver => (
                <Option key={driver.driver_id} value={driver.driver_id}>
                  {driver.driver_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="vehicle_plate_no"
            label="Vehicle Plate No"
            rules={[{ required: true, message: "Vehicle plate number is required" }]}
          >
            <Select placeholder="Select Vehicle" disabled>
              {drivers.map(driver => (
                <Option key={driver.vehicle_plate_no} value={driver.vehicle_plate_no}>
                  {driver.vehicle_plate_no}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="delivery_date"
            label="Delivery Date"
            rules={[{ required: true, message: "Please select a delivery date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Assign Truck
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderTablePage;
