import { Button, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const OrderForm = () => {
    const [form] = Form.useForm();
    const [shops, setShops] = useState([]);
    const [selectedShop, setSelectedShop] = useState(null);

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const apiUrl = await axios.get('/shops');
                setShops(apiUrl.data);
            } catch (error) {
                console.error('Error fetching shops:', error);
            }
        };

        fetchShops();
    }, []);

    const handleShopChange = (shopName) => {
        const shop = shops.find(shop => shop.shop_name === shopName);
        setSelectedShop(shop || null); // Update selected shop

        if (shop) {
            form.setFieldsValue({
                shop_address: shop.shop_address || '',
                township: shop.township_name || '',
                region: shop.region_name || '',
            });
        }
    };

    return (
        <div className='w-[400px] border border-gray-300 rounded-lg bg-white shadow-md'>
            <div className="px-5 py-5 bg-button">
                <h1 className="text-2xl font-bold text-white">Create Order</h1>
            </div>
            <hr />
            <Form
                form={form}
                layout="vertical"
                autoComplete="off"
                className='p-5'
            >
                {/* Shop Name Selection */}
                <Form.Item
                    label="Shop Name"
                    name="shop_name"
                    rules={[{ required: true }]}
                    className="flex-1"
                >
                    <Select
                        className="flex-1 w-full"
                        onChange={handleShopChange}
                        options={shops.map(shop => ({
                            value: shop.shop_name,
                            label: shop.shop_name
                        }))}
                    />
                </Form.Item>

                {/* Address Input */}
                <Form.Item
                    label="Address"
                    name="shop_address"
                    rules={[{ required: true }]}
                    className="flex-1"
                >
                    <Input placeholder="Enter shop address" className="w-full" />
                </Form.Item>

                {/* Township & Region Selection */}
                <div className="flex gap-8 mt-2">
                    <Form.Item
                        label="Township"
                        name="township"
                        rules={[{ required: true }]}
                        className="flex-1"
                    >
                        <Select
                            className="flex-1"
                            value={selectedShop?.township_name || undefined}
                            options={shops.map(shop => ({
                                value: shop.township_name,
                                label: shop.township_name
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Region"
                        name="region"
                        rules={[{ required: true }]}
                        className="flex-1"
                    >
                        <Select
                            className="flex-1"
                            value={selectedShop?.region_name || undefined}
                            options={shops.map(shop => ({
                                value: shop.region_name,
                                label: shop.region_name
                            }))}
                        />
                    </Form.Item>
                </div>

                {/* Product & Quantity Selection */}
                <div className="flex gap-8 mt-2">
                    <Form.Item
                        label="Choose Product"
                        name="product_name"
                        rules={[{ required: true }]}
                        className="w-[60%]"
                    >
                        <Select
                            className="w-[60%]"
                            options={[{ value: 'Apple', label: 'Apple' }]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Qty"
                        name="qty"
                        rules={[{ required: true }]}
                        className="flex-1"
                    >
                        <Input type='number' placeholder='Qty' className='w-full' />
                    </Form.Item>
                </div>

                {/* Remark Input */}
                <Form.Item label="Remark" name="remark" className="flex-1">
                    <Input.TextArea placeholder='Enter remark' autoSize={{ minRows: 2, maxRows: 6 }} />
                </Form.Item>

                {/* Submit Button */}
                <div className="font-bold">
                    <Form.Item className="mt-5">
                        <Button htmlType="submit" className='w-full text-white bg-gradient-purple'>
                            ADD
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default OrderForm;
