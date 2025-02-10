import React, { useEffect } from "react";
import { Table, Checkbox, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/deliSLice";

const DeliAssignTablePage = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const columns = [
    {
      title: "✔",
      dataIndex: "select",
      key: "select",
      render: (_, record) => <Checkbox />,
    },
    { title: "Invoice No.", dataIndex: "invoiceNo", key: "invoiceNo" },
    { title: "Shop Name", dataIndex: "shop_id", key: "shop_id" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Township", dataIndex: "township", key: "township" },
    { title: "Region", dataIndex: "region", key: "region" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Pending" ? "orange" : "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Delivery Assignments</h2>
      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        rowKey="order_id"
        locale={{ emptyText: "No orders yet" }}
      />
    </div>
  );
};

export default DeliAssignTablePage;
