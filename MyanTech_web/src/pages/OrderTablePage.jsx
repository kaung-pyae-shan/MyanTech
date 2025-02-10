import React, { useState, useEffect } from "react";
import { Table, Button, Modal,Checkbox, Form, Select, DatePicker, message } from "antd";

const { Option } = Select;

const OrderTablePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    fetchOrders();
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

  const handleBulkAssignClick = () => {
    if (selectedOrders.length === 0) {
      message.warning("Please select at least one order.");
      return;
    }
    setIsModalVisible(true);
  };

  const handleAssignTruck = async (values) => {
    try {
      const assignRequests = selectedOrders.map((orderId) => {
        const assignData = {
          order_id: orderId,
          driver_id: values.driver_id,
          vehicle_plate_no: values.vehicle_plate_no,
          delivery_date: values.delivery_date.format("YYYY-MM-DD"),
        };

        return fetch(`http://localhost:3001/assign_truck`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(assignData),
        });
      });

      await Promise.all(assignRequests);
      message.success("Truck assigned to selected orders successfully!");
      setIsModalVisible(false);
      form.resetFields();
      setSelectedOrders([]);
      fetchOrders(); // Refresh order list
    } catch (error) {
      console.error("Failed to assign truck:", error);
      message.error("Failed to assign the truck.");
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
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => status || "Pending",
    },
  ];

  const handleCheckboxChange = (e, orderId) => {
    if (e.target.checked) {
      setSelectedOrders((prev) => [...prev, orderId]);
    } else {
      setSelectedOrders((prev) => prev.filter((id) => id !== orderId));
    }
  };

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
            <Select placeholder="Select Driver">
              <Option value="1">John Doe</Option>
              <Option value="2">Jane Smith</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="vehicle_plate_no"
            label="Vehicle Plate No"
            rules={[{ required: true, message: "Please select a vehicle" }]}
          >
            <Select placeholder="Select Vehicle">
              <Option value="AA-1234">AA-1234</Option>
              <Option value="BB-5678">BB-5678</Option>
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
