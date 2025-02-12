import React, { useState } from 'react'
import OrderForm from '../../components/OrderForm'
import OrderTable from '../../components/orders/OrderTable'
import { Button } from 'antd'
import axios from '../../api/axios'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // Ensure this import is here
import EditOrderTable from '../../components/orders/EditOrderTable'
import EditOrderForm from '../../components/orders/EditOrderForm'
import { useNavigate } from 'react-router-dom'

const EditOrder = () => {
    const order = useSelector(state => state.orders.editOrders);
    const navigate = useNavigate()
    const [resetField, setResetField] = useState(false);

    console.log(order);

    const notify = () => toast.success("The Order is updated successfully!");

    const updateOrder = async () => {
        try {
            // Send PATCH request to update the order
            const response = await axios.patch(`/orders/${order.order_id}`, order);
    
            if (response.data) {
                setResetField(true);

                notify();

                // Add a slight delay before navigation to allow the toast to display
                setTimeout(() => {
                    navigate('/order-list');
                }, 2000);
            }
        } catch (error) {
            console.error('Failed to update order:', error);
            toast.error('Failed to update order');
        }
    };

    return (
        <div className='flex gap-3'>
            <ToastContainer />  {/* Ensure it's properly rendered */}
            <EditOrderForm resetField={resetField} setResetField={setResetField} />

            <div className="flex flex-col items-end justify-start">
                <div className="flex justify-end">
                    {order.products.length > 0 &&  
                        <Button 
                            onClick={updateOrder}
                            className='px-4 py-2 mt-3 text-white bg-button'>
                            Update Order
                        </Button>
                    }
                </div>

                <EditOrderTable />
            </div>
        </div>
    )
}

export default EditOrder
