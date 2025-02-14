import { Tabs } from 'antd';
import React, { useState } from 'react';
import AllOrder from './AllOrder';
import CanceledOrders from './CanceledOrders';
import CompletedOrders from './CompletedOrders';
import DeliveringOrders from './DeliveringOrders';
import { Link } from 'react-router-dom';

const OrderTab = () => {
  const [activeKey, setActiveKey] = useState('1');

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  const items = [
    {
      key: '1',
      label: 'All',
      children: <AllOrder activeKey={activeKey} />,
    },
    {
      key: '2',
      label: 'Completed',
      children: <CompletedOrders activeKey={activeKey} />,
    },
    {
      key: '3',
      label: 'Canceled',
      children: <CanceledOrders activeKey={activeKey} />,
    },
    {
      key: '4',
      label: 'Delivering',
      children: <DeliveringOrders activeKey={activeKey} />,
    },
  ];

  return (
    <div className="relative">
      <Tabs defaultActiveKey="1" onChange={handleTabChange} items={items} />
      <div className="absolute top-0 right-3">
        <Link to="/create-order" className="inline-block px-4 py-2 text-white bg-blue-600 rounded-md">
          + Create Order
        </Link>
      </div>
    </div>
  );
};

export default OrderTab;
