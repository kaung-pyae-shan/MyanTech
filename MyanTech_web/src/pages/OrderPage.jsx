import React from "react";
import { Layout } from "antd";
import OrderTablePage from "./OrderTablePage";

const { Content } = Layout;

const OrderPage = () => {
  return (
    <Layout style={{ padding: "20px" }}>
      <Content>
        <h2>Order Management</h2>
        <OrderTablePage />
      </Content>
    </Layout>
  );
};

export default OrderPage;
