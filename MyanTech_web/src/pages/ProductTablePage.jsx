import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, addProduct, updateProduct } from "../redux/productSlice";
import { Col, Row } from 'antd';
import { motion } from 'framer-motion';

const { Option } = Select;

const ProductTablePage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const user = localStorage.getItem('user')

  useEffect(() => {
    dispatch(fetchProducts());
    fetchBrands();
    fetchCategories();
  }, [dispatch]);

  const fetchBrands = async () => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    setBrands(data);
  };

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    setCategories(data);
  };


  const handleAddProduct = async (values) => {




    console.log("Updating product:", values);
  
    if (isEditMode) {
      dispatch(updateProduct({ ...selectedProduct, ...values }))
        .unwrap()
        .then(() => {
          console.log("Product updated successfully");
          dispatch(fetchProducts()); // Ensure table refreshes
        })
        .catch((error) => console.error("Update error:", error));
    } else {
      console.log(values);
      
      dispatch(addProduct({ ...values }))
        .unwrap()
        .then(() => console.log("Product added successfully" + [...values]))
        .catch((error) => console.error("Add error:", error));
    }
  
    setIsModalVisible(false);
    form.resetFields();
    setIsEditMode(false);
    setSelectedProduct(null);
  };
  

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const columns = [
    { title: "No.", dataIndex: "product_id", key: "product_id" },
    { title: "Product Name", dataIndex: "name", key: "name" },
    { title: "Brand", dataIndex: "brand_name", key: "brand_name" },
    { title: "Type", dataIndex: "type_name", key: "type_name" },
    { title: "Unit Price", dataIndex: "price", key: "price" },
    { title: "Stock", dataIndex: "stocck", key: "stocck" },
    { title: "Cash Back", dataIndex: "cashback", key: "cashback" },
    { title: "Serial No", dataIndex: "serialNo", key: "serialNo" },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (_, record) => (
    //     <Button type="link" onClick={() => handleEdit(record)}>
    //       Edit
    //     </Button>
    //   ),
    // },
  ];

  return (
    <div style={{ padding: "20px" }}>
     {/* { user.role === 'warehouse' && */}
     <div className="flex justify-end">
     <Button
        className="ml-auto mr-0 text-white bg-button"
        onClick={() => {
          setIsEditMode(false);
          setIsModalVisible(true);
          form.resetFields();
        }}
        style={{ marginBottom: "16px" }}
      >
        + Create Product
      </Button>
     </div>

      <Table columns={columns} dataSource={products} loading={loading} rowKey="product_id" locale={{ emptyText: "No items yet" }} 
        pagination={{ pageSize: 5 }} />

<Modal
  title={isEditMode ? "Edit Product" : "Create Product"}
  open={isModalVisible}
  onCancel={() => setIsModalVisible(false)}
  footer={null}
>
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    <Form form={form} onFinish={handleAddProduct} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
            <Input placeholder="Enter product name" />
          </Form.Item>
          <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
            <Select placeholder="Select a brand">
              {brands.map(({ brand_id, brand_name }) => (
                <Option key={brand_id} value={brand_id}>{brand_name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        
        <Col span={12}>
          <Form.Item name="type" label="Category" rules={[{ required: true }]}>
            <Select placeholder="Select a category">
              {categories.map(({ category_id, category_name }) => (
                <Option key={category_id} value={category_id}>{category_name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="stocck" label="Stock" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="cashback" label="Cash Back">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      
      <Form.Item name="serialNo" label="Serial No" rules={[{ required: true }]}>
        <Input placeholder="Enter serial number" />
      </Form.Item>
      
      <Form.Item>
        <Button  htmlType="submit" className="w-full text-white bg-button">
          {isEditMode ? "Update Product" : "Add Product"}
        </Button>
      </Form.Item>
    </Form>
  </motion.div>
</Modal>
    </div>
  );
};

export default ProductTablePage;
