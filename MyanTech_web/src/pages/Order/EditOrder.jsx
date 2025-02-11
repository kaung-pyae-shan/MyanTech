import React, { useState } from 'react'
import OrderForm from '../../components/OrderForm'
import OrderTable from '../../components/orders/OrderTable'
import { Button } from 'antd'
import axios from '../../api/axios'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import EditOrderTable from '../../components/orders/EditOrderTable'
import EditOrderForm from '../../components/orders/EditOrderForm'
import { updateProduct } from '../../redux/productSlice'

const EditOrder = () => {

    const order = useSelector(state => state.orders.editOrders);

    const [resetField, setResetField] = useState(false);

    console.log(order);
    

    const updateOrder = async () => {
        try {
            // Send PATCH request to update the order
            const response = await axios.patch(`/orders/${order.order_id}`, order);
    
            // Handle success
            console.log('Order updated successfully:', response.data);
    
            // Optionally update the local state or Redux store if needed
            // For example, if you use Redux:
            // dispatch(updateOrderSuccess(response.data)); // You would need an appropriate action
    
        } catch (error) {
            // Handle error
            console.error('Failed to update order:', error);
        }
    };
    

  return (
    <div className='flex gap-3'>
      <ToastContainer />  
      <EditOrderForm resetField={resetField} setResetField={setResetField} />

      <div className="flex flex-col items-end justify-start">
        <div className="flex justify-end">
     {order.products.length > 0 &&  <Button 
        onClick={updateOrder}
        className='px-4 py-2 mt-3 text-white bg-button'>Update Order</Button>
     }
        </div>
     
      <EditOrderTable />

   
      </div>
    </div>
  )
}

export default EditOrder
