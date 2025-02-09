import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, addProduct } from "../redux/productSlice";

const { Option } = Select;

const ProductTablePage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
    fetchBrands();
    fetchCategories();
  }, [dispatch]);

  const fetchBrands = async () => {
    const response = await fetch("http://localhost:3000/brand");
    const data = await response.json();
    setBrands(data);
  };

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:3000/category");
    const data = await response.json();
    setCategories(data);
  };

  const handleAddProduct = async (values) => {
    const newProduct = {
      id: Date.now(), // Generate unique ID
      ...values,
    };

    dispatch(addProduct(newProduct));

    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    { title: "No.", dataIndex: "id", key: "id" },
    { title: "Product Name", dataIndex: "name", key: "name" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Unit Price", dataIndex: "price", key: "price" },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    { title: "Cash Back", dataIndex: "cashBack", key: "cashBack" },
    { title: "Serial No", dataIndex: "serialNo", key: "serialNo" },
    { title: "Details", key: "details", render: (_, record) => (
        <Button type="link" onClick={() => console.log(record)}>View</Button>
      )
    }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: "16px" }}>
        Create Product
      </Button>

      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        rowKey="id"
        locale={{ emptyText: "No items yet" }}
      />

      {/* Modal Form */}
      <Modal
        title="Create Product"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddProduct} layout="vertical">
          <Form.Item name="name" label="Enter Product Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="brand" label="Choose Brand" rules={[{ required: true }]}>
            <Select placeholder="Select a brand">
              {brands.map((brand) => (
                <Option key={brand.id} value={brand.brand_name}>{brand.brand_name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="type" label="Choose Type" rules={[{ required: true }]}>
            <Select placeholder="Select a category">
              {categories.map((category) => (
                <Option key={category.id} value={category.category_name}>{category.category_name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="cashBack" label="Cash Back">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="serialNo" label="Serial No" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Add Product</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductTablePage;
