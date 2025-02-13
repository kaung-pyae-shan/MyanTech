import React from 'react';
import { Card, Col, Row } from 'antd';
import { BsReceipt } from "react-icons/bs";
import { CiShop } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlineAssignmentReturn } from "react-icons/md";

const HomeCard = () => 
{ 
    const cards = [
        {
            title: 'Orders Provided',
            value: '70',
            bg: ' bg-gradient-teal',
            icon: <BsReceipt className='text-xl ' />

        },
        {
            title: 'Store Product',
            value: '70',
            bg: ' bg-gradient-purple',
            icon: <CiShop />

        },
        {
            title: 'On Delivery',
            value: '70',
            bg: ' bg-gradient-orange',
            icon: <CiDeliveryTruck />

        },
        {
            title: 'Total Incomes',
            value: '70',
            bg: ' bg-gradient-green',
            icon:  <MdOutlineAssignmentReturn />

        },

    ]

    const Title1 =   <div className='flex items-center gap-3 text-white'>
                        <BsReceipt className='text-xl ' /> 
                        <h2>Order Provided</h2>
                    </div>
    
    const Title2 =   <div className='flex items-center gap-3 text-white'>
                        <BsReceipt className='text-xl ' /> 
                        <h2>Store Shop</h2>
                    </div>
                    
     const Title3 =   <div className='flex items-center gap-3 text-white'>
                        <BsReceipt className='text-xl ' /> 
                        <h2>On Delivery</h2>
                    </div>
    
    const Title4 =   <div className='flex items-center gap-3 text-white'>
                    <BsReceipt className='text-xl ' /> 
                    <h2>Total Incomes</h2>
</div>
       
  
    return(

        

  <Row gutter={16}>
    <Col span={6}>
      <Card
       title={Title1}
       variant="borderless"
       className='title1 '
       style={{padding: '0px 0px', border: '1px solid blue'}}
      
       
       >
         <div className='flex justify-between'>
         <div className='text-center '>
            <p className='text-lg font-bold'>210</p>
            <span className='font-semibold text-gray-600 text-normal '>Pending</span>
         </div>
         <div className='text-center'>
            <p className='text-lg font-bold'>210</p>
            <span className='font-semibold text-gray-600 text-normal '>Completed</span>
         </div>
         </div>
       
      </Card>
    </Col>
    <Col span={6}>
      <Card  title={Title2}
      className=' title2'
       variant="borderless"
       style={{padding: '0px 0px', border: '1px solid teal'}}
       >
         <div className='flex justify-between'>
         <div className='text-center '>
            <p className='text-lg font-bold'>210</p>
            <span className='font-semibold text-gray-600 text-normal '>Total</span>
         </div>
         <div className='text-center'>
            <p className='text-lg font-bold '>210</p>
            <span className='font-semibold text-gray-600 text-normal '>Sold Out</span>
         </div>
         </div>
      </Card>
    </Col>
    <Col span={6}>
      <Card 
      title={Title3}
      className=' title3'
       variant="borderless"
       style={{padding: '0px 0px', border: '1px solid orange'}}
       >
         <div className='flex justify-between'>
         <div className='text-center '>
            <p className='text-lg font-bold'>210</p>
            <span className='font-semibold text-gray-600 text-normal '>On Delivery</span>
         </div>
         <div className='text-center'>
            <p className='text-lg font-bold '>210</p>
            <span className='font-semibold text-gray-600 text-normal '>Delivered</span>
         </div>
         </div>
      </Card>
    </Col>
    <Col span={6}>
      <Card 
      title={Title4}
      className=' title4'
      style={{padding: '0px 0px', border: '1px solid green'}}
       variant="borderless">
         <div className='flex justify-between'>
         <div className='text-center '>
            <p className='text-lg font-bold'>210</p>
            <span className='font-semibold text-gray-600 text-normal '>Total</span>
         </div>
         <div className='text-center'>
            <p className='text-lg font-bold '>210</p>
            <span className='font-semibold text-gray-600 text-normal '>Sold Out</span>
         </div>
         </div>
      </Card>
    </Col>
  </Row>
)}
export default HomeCard;