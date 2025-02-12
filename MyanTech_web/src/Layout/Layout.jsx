import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FolderOpenOutlined,
  LayoutOutlined,
  ShoppingOutlined

} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, Link } from 'react-router-dom';
// import Logout from '../pages/User/Logout';
import { FormOutlined, TruckOutlined } from '@ant-design/icons';
// import { UnorderedListOutlined } from '@ant-design/icons';
import { FolderOutlined } from '@ant-design/icons';
import { LogoutOutlined } from '@ant-design/icons';
// import Logo from "../assets/Images/Logo.png";
const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const username = localStorage.getItem('user')



  return (
    <Layout className="min-h-screen ">
      <Sider className='relative w-[100%] bg-dark ' trigger={null} collapsible collapsed={collapsed} >
        <div className="demo-logo-vertical" />
        {
          collapsed ?

            <div className='mx-[1.5rem] mt-5 h-[50px] w-[100%]'>
              <h2
                className={` z-10 text-xl font-bold bg-gradient-purple bg-clip-text text-transparent`}>MT</h2>
            </div>
            :
            <div className='mx-[3rem] mt-5 h-[50px]'>
              <h2
                className={`w-[100%] z-10 text-xl font-bold bg-gradient-purple bg-clip-text text-transparent`}>Myan Tech</h2>
            </div>
        }





        <Menu
          theme='dark'
          mode="inline"
          className="mt-[2rem] bg-dark  hover:bg-none   px-2 "

          type='primary'

          items={[
            {
              key: '1',
              icon: <FormOutlined style={{ color: 'white' }} />,
              defaultSelectedKeys: ['1'],

              label: <Link to="/" style={{ color: 'white' }}>Dashboard </Link>,

              style: {
                border: '1px solid gray', marginBottom: '20px ',
                padding: !collapsed ? '15px 20px' : '', borderRadius: '10px', color: 'white',
                background: '#52525233'
              },

            },

            {
              key: '2',
              icon: <ShoppingOutlined />,
              defaultSelectedKeys: ['2'],
              

              label: <Link to="/order-list" className=' text-[15px]'>Order List</Link>,
              style: {
                border: '1px solid gray', marginBottom: '20px ',
                padding: !collapsed ? '15px 20px' : '', borderRadius: '10px', color: 'white',
                background: '#52525233'

              },
            },


            {
              key: '3',
              icon: <ShoppingOutlined />,
              defaultSelectedKeys: ['23'],
              

              label: <Link to="/create-order" className=' text-[15px]'>Create Orders</Link>,
              style: {
                border: '1px solid gray', marginBottom: '20px ',
                padding: !collapsed ? '15px 20px' : '', borderRadius: '10px', color: 'white',
                background: '#52525233'

              },
            },

            {
              key: '4',
              icon: <FolderOutlined />,
              defaultSelectedKeys: ['4'],

              label: <Link to="/product" className=' text-[15px]'>Products</Link>,
              style: {
                border: '1px solid gray', marginBottom: '20px ',
                padding: !collapsed ? '15px 20px' : '', borderRadius: '10px', color: 'white',
                background: '#52525233'

              },
            },

            {
              key: '5',
              icon: <TruckOutlined />,
              defaultSelectedKeys: ['5'],

              label: <Link to="/assign/truck" className=' text-[15px]'>Assign Truck</Link>,
              style: {
                border: '1px solid gray', marginBottom: '20px ',
                padding: !collapsed ? '15px 20px' : '', borderRadius: '10px', color: 'white',
                background: '#52525233'

              },
            },

            {
              key: '6',
              icon: <TruckOutlined />,
              defaultSelectedKeys: ['6'],

              label: <Link to="/drivers"className=' text-[15px]'>Driver</Link>,
              style: {
                border: '1px solid gray', marginBottom: '20px ',
                padding: !collapsed ? '15px 20px' : '', borderRadius: '10px', color: 'white',
                background: '#52525233'

              },
            },

          ]}
        />






        {/* <div className="fixed bottom-0 mx-5">
          <LogoutOutlined />
         <Logout />
        </div> */}
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#1C1C25',

          }}
          className="flex justify-between w-full"
        >

          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                color: "white",
              }}
            />
            <h2 className='text-3xl text-transparent bg-gradient-purple bg-clip-text'> Sales Department </h2>
          </div>




          <div className="mr-[3rem]">
            <Button className="mr-[8px] h-10 rounded-xl mt-3 bg-button px-[25px] hover:bg-none">
              Logout<LogoutOutlined/> 
            </Button>
            {username}

            {/* <Logout /> */}
          </div>


        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
