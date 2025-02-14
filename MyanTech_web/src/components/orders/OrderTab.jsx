import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
import AllOrder from './AllOrder';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

import CanceledOrders from './CanceledOrders';
import Delivering from './Delivering';

import axios from '../../api/axios';


const OrderTab = () => {

  //  const [loading, setLoading] = useState(false)
  // const [orders, setOrders] = useState([]);
   
    // useEffect(()=>{
    //    const fetchOrders = async () => {
    //               setLoading(true)
    //               try {
    //                   const response = await axios.get(`/orders`);
    //                   setOrders(response.data);
    //                   setLoading(false)
    //               } catch (error) {
    //                   console.error("Error fetching orders:", error);
    //                   setLoading(false)
      
    //               }
    //           };
      
    //           fetchOrders();
    // },)


    const [items, setItems] = useState([
        {
            key: '1',
            label: 'All',
            children: <AllOrder />,
          },
          {
            key: '2',
            label: 'Completed',
            children: <CanceledOrders />,
          },
          {
            key: '3',
            label: 'Pending Orders',
            children: <CanceledOrders />,
          },
          {
            key: '4',
            label: 'Delivered',
            children: <Delivering />,
          },
          {
            key: '5',
            label: 'Faulty Products',
            children: 'Content of Tab Pane 3',
          },
          
    ])

  return (
    <div className="relative">
        <Tabs
    defaultActiveKey="1"
    
    
    items={items}
  />

  <div className="absolute top-0 right-3">
    <Link to='/create-order' className='inline-block px-4 py-2 text-white bg-blue-600 rounded-md'> + Create Order</Link>
  </div>
    </div>
    
  )
}

export default OrderTab
