import React from "react";
import { Layout } from "antd";
import ProductTablePage from "./ProductTablePage";
import { Form, Input, InputNumber, Button } from "antd";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/productSlice";

const { Content } = Layout;

const ProductPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(addProduct(values));
    form.resetFields();
  };

  return (
    <Layout style={{ padding: "20px" }}>
      <Content>
        <h2>Product List</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Type">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Unit Price" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="stock" label="Stock">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="cashBack" label="Cash Back">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add Product</Button>
          </Form.Item>
        </Form>

        <ProductTablePage />
      </Content>
    </Layout>
  );
};

export default ProductPage;
