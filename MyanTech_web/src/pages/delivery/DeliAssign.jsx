import React, { useEffect } from "react";
import { Table, Select, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../../redux/deliSLice";

const { Option } = Select;

const DeliAssignPage = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = (id, status) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  const columns = [
    { title: "Invoice No.", dataIndex: "invoiceNo", key: "invoiceNo" },
    { title: "Shop Name", dataIndex: "shopName", key: "shopName" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Township", dataIndex: "township", key: "township" },
    { title: "Region", dataIndex: "region", key: "region" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select value={status} onChange={(value) => handleStatusChange(record.id, value)}>
          <Option value="Pending">
            <Tag color="orange">Pending</Tag>
          </Option>
          <Option value="Delivered">
            <Tag color="green">Delivered</Tag>
          </Option>
        </Select>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Delivery Management</h2>
      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        rowKey="id"
        locale={{ emptyText: "No deliveries yet" }}
      />
    </div>
  );
};

export default DeliAssignPage;
