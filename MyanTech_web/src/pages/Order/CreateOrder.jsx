import React, { useState } from 'react'
import OrderForm from '../../components/OrderForm'
import OrderTable from '../../components/orders/OrderTable'
import { Button } from 'antd'
import axios from '../../api/axios'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreateOrder = () => {

    const order = useSelector(state => state.orders.order);
     const [shopDisable, setShopDisable] = useState(false)
    

    const [resetField, setResetField] = useState(false);
    const navigate = useNavigate()

   const createProduct = async () => {
      try {
        const response = await axios.post('/orders', order);
   
        setResetField(true);

        if(response.status === 201){
          setShopDisable(false)

          const notify = () => toast("An Order has been created!");
          
          notify();
          setTimeout(()=>{ 
            navigate('/order-list')

          },2000)

          
        }
        console.log('Product Created:', response.data);
      } catch (error) {
        console.error('Error creating product:', error.response ? error.response.data : error.message);
      }
    };
    

  return (
    <div className='flex gap-3'>
      <ToastContainer />  
      <OrderForm shopDisable={shopDisable} setShopDisable={setShopDisable} resetField={resetField} setResetField={setResetField} />

      <div className="flex flex-col items-end justify-start">
        <div className="flex justify-end">
     {order.products.length > 0 &&  <Button 
        onClick={createProduct}
        className='px-4 py-2 mt-3 text-white bg-button'>Create Order</Button>
     }
        </div>
     
      <OrderTable />

   
      </div>
    </div>
  )
}

export default CreateOrder
