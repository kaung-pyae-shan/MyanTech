import { Tabs } from 'antd';
import React, { useState } from 'react'
import AllOrder from './AllOrder';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import CanceledOrders from './CanceledOrders';
import Delivering from './Delivering';

const OrderTab = () => {

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
