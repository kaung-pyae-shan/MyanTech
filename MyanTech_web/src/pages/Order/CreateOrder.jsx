import React from 'react'
import OrderForm from '../../components/OrderForm'
import OrderTable from '../../components/orders/OrderTable'
import { Button } from 'antd'
import axios from '../../api/axios'
import { useSelector } from 'react-redux'

const CreateOrder = () => {

    const order = useSelector(state => state.orders.order);

   const createProduct = async () => {
      try {
        const response = await axios.post('/orders', order);
        
        console.log('Product Created:', response.data);
      } catch (error) {
        console.error('Error creating product:', error.response ? error.response.data : error.message);
      }
    };
    

  return (
    <div className='flex gap-3'>
      <OrderForm />

      <div className="flex flex-col items-end justify-start">
        <div className="flex justify-end">
       { order.length > 0 && <Button 
        onClick={createProduct}
        className='px-4 py-2 mt-3 text-white bg-button'>Create Order</Button>}
        </div>
     
      <OrderTable />

   
      </div>
    </div>
  )
}

export default CreateOrder
