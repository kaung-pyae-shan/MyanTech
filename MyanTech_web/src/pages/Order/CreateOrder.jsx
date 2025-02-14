import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrderForm from '../../components/OrderForm';
import OrderTable from '../../components/orders/OrderTable';
import { Button } from 'antd';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateOrder = () => {
  const order = useSelector((state) => state.orders.order);
  const [shopDisable, setShopDisable] = useState(false);
  const [resetField, setResetField] = useState(false);
  const navigate = useNavigate();

  const createProduct = async () => {

    console.log(order);
    
    try {
      const response = await axios.post('/order/create', order);


      setResetField(true);

      if (response.status === 201) {
        setShopDisable(false);

        toast.success('An Order has been created!');

        setTimeout(() => {
          navigate('/order-list');
        }, 2000);
      }
    } catch (error) {
      console.error('Error creating product:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <motion.div
      className="flex gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <ToastContainer />

      {/* Animated Order Form */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <OrderForm shopDisable={shopDisable} setShopDisable={setShopDisable} resetField={resetField} setResetField={setResetField} />
      </motion.div>

      <div className="flex flex-col items-end justify-start">
        <div className="flex justify-end">
          {order.products.length > 0 && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button onClick={createProduct} className="px-4 py-2 mt-3 text-white bg-button">
                Create Order
              </Button>
            </motion.div>
          )}
        </div>

        {/* Animated Order Table */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <OrderTable />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CreateOrder;
