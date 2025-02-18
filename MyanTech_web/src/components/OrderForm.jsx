import { Button, Form, Input, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, addProductOrder, addShop, resetOrder } from '../redux/services/OrderSlice'; // Import Redux action
import axios from '../api/axios';
import { addProduct } from '../redux/productSlice';
import { Color } from 'antd/es/color-picker';

const OrderForm = ({ resetField, setResetField, shopDisable, setShopDisable }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders); // Get orders from Redux store
    const order = useSelector(state => state.orders.order); // Get orders from Redux store

    const [shops, setShops] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedShop, setSelectedShop] = useState(null);

    const [inputMessage, setInputMessage] = useState(null)

    console.log(orders);
    console.log(order);


    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await axios.get('/order/form/shops');
                console.log(response.data);
                
                setShops(response.data);
            } catch (error) {
                console.error('Error fetching shops:', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get('/order/form/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchShops();
        fetchProducts();
    }, []);

    if (resetField) {
        form.resetFields();
        dispatch(resetOrder());
        setResetField(false);

    }

    const handleProductChange = (productName) => {

        const product = products.find(p => p.name === productName);



        console.log(products)
        setSelectedProduct(product || null);

        if (product) {
            form.setFieldsValue({
                quantity: product.quantity || '',
                price: product.price || '',
                stock: product.stock || '',


            });
        }
    };

    const handleSubmit = (values) => {

        console.log(values);

        const selectedProductData = products.find(p => p.name === values.product_name);



        if (!selectedProductData) {
            console.error("No product selected");
            return;
        }

        const shop = {
            shopId: selectedShop?.shop_id || 0,
            // shop_name: values.shop_name,
            // contact: selectedShop?.contact,
            // shop_address: selectedShop?.shop_address || '',
            // township_id: selectedShop?.township_id || '',
            // township_name: selectedShop?.township_name || '',
            // region_id: selectedShop?.region_id || '',
            // region_name: selectedShop?.region_name || '',
        }

        const newproducts = {
            productId: selectedProductData.product_id,
            quantity: values.qty,
            // remarks: values.remark,
            // product_id: selectedProductData.id,
            product_name: selectedProductData.name,
            // quantity: values.qty,
             stock: selectedProduct.stock,
             unit_price: selectedProductData.price,
             subtotal: values.qty * selectedProductData.price,
            remarks: values.remark,
            // status: '',
            // wrong_qty: 0,
            // wrong_remark: '',
            // falty_qty: 0,
            // falty_remark: ''
        }

        console.log(newproducts);

        // const newOrder = {
        //     id: Date.now(), // Unique ID

        //     products: [{
        //         product_id: selectedProductData.id,
        //         product_name: selectedProductData.name,
        //         quantity: values.qty,
        //         unit_price: selectedProductData.price,
        //         subtotal: values.qty * selectedProductData.price
        //     }],
        //     total_price: values.qty * selectedProductData.price,
        //     remarks: values.remark || ''
        // };

        console.log();
 

        dispatch(addProductOrder(newproducts));
        dispatch(addShop(shop))


        form.resetFields(['qty', 'product_name', 'price', 'stock', 'remark']);

        setShopDisable(true)


        setSelectedProduct(null);
        // form.resetFields();
        // setSelectedProduct(null);
        // setSelectedShop(null);
    };

    const handleShopChange = (shopName) => {
        const shop = shops.find(shop => shop.shop_name === shopName);



        console.log(shop);

        setSelectedShop(shop || null);

        if (shop) {
            form.setFieldsValue({
                shop_address: shop.shop_address || '',
                contact: shop.contact || '',
                township_id: shop.township_id || '',
                township_name: shop.township_name || '',
                region_id: shop.region_id || '',
                region_name: shop.region_name || '',
            });
        }
    };

    const checkStock = (e) => {

        console.log(selectedProduct);

        const product = products.find(product => product?.name === selectedProduct?.name);

        if (product) {
            e.target.value > product.stock ? setInputMessage('Out of Stock !') : setInputMessage(null)
        }

    }


    return (
        <div className='w-[400px] border border-gray-300 rounded-lg bg-white shadow-md'>
            <div className="px-5 py-5 bg-button">
                <h1 className="text-2xl font-bold text-white">Create Order</h1>
            </div>
            <hr />
            <Form form={form} layout="vertical" autoComplete="off" className='p-5' onFinish={handleSubmit}>
                {/* Shop Name Selection */}
                <Form.Item
                    label="Shop Name"
                    name="shop_name"
                    rules={[{ required: true }]}
                   
                >
                    <Select
                        showSearch
                         disabled = {shopDisable}
                        className="w-full"
                        placeholder="Select a shop"

                        onChange={handleShopChange}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                          }
                        options={shops.map(shop => ({
                            value: shop.shop_name,
                            label: shop.shop_name
                        }))}
                    />
                </Form.Item>

                {/* Address Input */}
                <Form.Item label="Address" name="shop_address">
                    <Input placeholder="Enter shop address" className="w-full" disabled />
                </Form.Item>

                {/* Township & Region Selection */}
                <div className="flex gap-4">
                    <Form.Item label="Township" name="township_name">
                        <Input className="w-full" disabled />
                    </Form.Item>

                    <Form.Item label="Region" name="region_name">
                        <Input className="w-full" disabled />
                    </Form.Item>
                </div>

                {/* Product & Quantity Selection */}
                <div className="flex items-center gap-3">
                    <Form.Item label="Choose Product" style={{ width: '100%' }} name="product_name" rules={[{ required: true }]}>
                        <Select
                            showSearch
                            onChange={handleProductChange}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                              }
                            options={products
                                .filter(product =>
                                    !order.products.some(addedProduct => addedProduct.product_name === product.name)
                                )
                                .map(product => ({
                                    value: product.name,
                                    label: product.name
                                }))
                            }
                        />
                    </Form.Item>

                    <Form.Item label="Qty"
                        onChange={(e) => {
                            form.setFieldsValue({ qty: e.target.value }); // Ensure Form updates qty
                            checkStock(e);
                        }}
                        rules={[{ required: true }]}
                        name="qty" className='relative' style={{ width: '100%' }}>
                        <Input   type='number' style={{ width: '100%' }} onChange={checkStock} placeholder='Qty' rules={[{ required: true }]} />
                        <p className='absolute text-red-600'>{inputMessage}</p>
                    </Form.Item>
                </div>

                <div className="flex gap-3">
                    {/* Price Display */}
                    <Form.Item label="Price" name="price">
                        <Input disabled color='black ' />
                    </Form.Item>

                    <Form.Item label="Stock" name="stock">
                        <Input disabled />
                    </Form.Item>
                </div>

                {/* Remark Input */}
                <Form.Item label="Remark" name="remark">
                    <Input.TextArea placeholder='Enter remark' autoSize={{ minRows: 2, maxRows: 6 }} />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item className="mt-5">
                    <Button htmlType="submit" className='w-full text-white bg-gradient-purple'>
                        ADD
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default OrderForm;
