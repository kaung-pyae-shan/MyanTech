import { Button, Form, Input, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductOrder, addProductToEdit, addShop, oldOrder, updateOrder } from '../../redux/services/OrderSlice';
import axios from '../../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EditOrderForm = ({resetField, setResetField}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderToEdit = location.state?.orderData;
    const [form] = Form.useForm();
    const dispatch = useDispatch();
        const [inputMessage, setInputMessage] = useState(null)
    
    
    const [shops, setShops] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedShop, setSelectedShop] = useState(null);

    useEffect(() => {
        if (orderToEdit) {

            console.log(orderToEdit);
            
            
            form.setFieldsValue({
                order_id: orderToEdit.id,
                invoice_no: orderToEdit.invoice_no,
                shop_id: orderToEdit.shop_id,
                shop_name: orderToEdit.shop_name,
                shop_address: orderToEdit.shop_address,
                contact: orderToEdit.contact,
                township_id: orderToEdit.township_id,
                township_name: orderToEdit.township_name,
                region_name: orderToEdit.region_name,
                order_status: orderToEdit.order_status,
                
                
            });

            const shop = {
                order_id: orderToEdit.id,
                invoice_no: orderToEdit.invoice_no,
                shop_id: orderToEdit.shop_id,
                shop_name: orderToEdit.shop_name,
                shop_address: orderToEdit.shop_address,
                contact: orderToEdit.contact,
                township_id: orderToEdit.township_id,
                township_name: orderToEdit.township_name,
                region_name: orderToEdit.region_name,
                order_status: orderToEdit.order_status,
                
            }

            dispatch(oldOrder(shop))

            if (orderToEdit.products?.length > 0) {
                dispatch(updateOrder(orderToEdit.products));
            }

            // setSelectedProduct(orderToEdit);
            setSelectedShop(orderToEdit);
        }

        const fetchShops = async () => {
            try {
                const response = await axios.get('/shops');
                setShops(response.data);
            } catch (error) {
                console.error('Error fetching shops:', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchShops();
        fetchProducts();
    }, [orderToEdit]);

    const handleSubmit = (values) => {

        console.log(values);
        const selectedProductData = products.find(p => p.name === values.product_name);

        
        const   newproducts = {
            product_id: selectedProduct.id,
            product_name: selectedProductData.name,
            quantity: values.qty,
            unit_price: selectedProductData.price,
            subtotal: values.qty * selectedProductData.price,
            remark: values.remark
        }
        
        if (!orderToEdit) return;
        
        // const updatedOrder = {
        //     ...orderToEdit,
        //     shop_name: values.shop_name,
        //     shop_address: values.shop_address,
        //     township_name: values.township_name,
        //     region_name: values.region_name,
        //     product_name: values.product_name,
        //     quantity: values.qty,
        //     unit_price: values.price,
        //     stock: values.stock,
        //     remark: values.remark,
        // };

    //    console.log(updateOrder);
       

        dispatch(addProductToEdit({newproducts}));
        // message.success('Order updated successfully!');
        // navigate('/orders'); // Redirect to orders list
    };

    const handleProductChange = (productName) => {
        
        const product = products.find(p => p.name === productName);

        

        console.log(products)
        setSelectedProduct(product || null);

        if (product) {
            form.setFieldsValue({
                price: product.price || '',
                stock: product.stock || '',
            
                
            });
        }
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

    const checkStock = (e) =>{

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
                               className="w-full" 
                               onChange={handleShopChange} 
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
                           <Form.Item label="Choose Product" style={{width: '100%'}} name="product_name" rules={[{ required: true }]}>
                               <Select
                               
                                onChange={handleProductChange} options={products.map(product => ({
                                   value: product.name,
                                   label: product.name
                               }))} />
                           </Form.Item>
       
                           <Form.Item label="Qty"
                           onChange={(e) => {
                               form.setFieldsValue({ qty: e.target.value }); // Ensure Form updates qty
                               checkStock(e);
                           }} 
                            name="qty" className='relative' style={{width: '100%'}}>
                               <Input  type='number' style={{width: '100%'}} onChange={checkStock} placeholder='Qty' rules={[{ required: true   }]} />
                                 <p className='absolute text-red-600'>{inputMessage}</p>   
                           </Form.Item>
                       </div>
       
                      <div className="flex gap-3">
                                {/* Price Display */}
                           <Form.Item label="Price" name="price">
                               <Input disabled color='black '/>
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

export default EditOrderForm;
