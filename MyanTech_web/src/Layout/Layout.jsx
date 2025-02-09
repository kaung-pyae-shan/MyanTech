import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FolderOpenOutlined,
  LayoutOutlined 
  
  
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, Link } from 'react-router-dom';
// import Logout from '../pages/User/Logout';
import { FormOutlined } from '@ant-design/icons';
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

        <div className='mx-[3rem] mt-5 h-[50px]'>
         
          <h2 className={`text-xl font-bold text-white ${collapsed ? ' hidden' : ' '}`} >Myan Tech </h2>
        </div>  
        <Menu
          theme='dark'
          mode="inline"
          className="mt-[2rem] bg-dark  hover:bg-none   px-4 "
           
          type = 'primary'
       
          items={[
            {
              key: '1',
              icon: <FormOutlined style={{color:'white'}} />,
              defaultSelectedKeys: ['1'],
              
              label: <Link to="/" style={{color: 'white'}}>abcd </Link>,
              
              style: { 
                border: '1px solid gray', marginBottom: '20px ',
                padding: !collapsed? '25px 20px': '', borderRadius: '10px', color: 'white',
                background: '#52525233'
              },
             
            },
            {
              key: '2',
              icon: <FolderOutlined />,
              defaultSelectedKeys: ['2'],

              label: <Link to="/test" className=' text-[15px]'>Test</Link>,
              style: { 
                border: '1px solid gray', marginBottom: '20px ',
                padding: !collapsed? '25px 20px': '', borderRadius: '10px', color: 'white',
                background: '#52525233'

              },
            },

            
          
          ]}
        />


      <Menu
         
          mode="inline"
          className=" w-full top-[150px] hover:bg-none mt-[400px] bg-button"  // Push to the bottom
        >
          <Menu.Item
            key="logout"
            className=''
            icon={<LogoutOutlined className=' hover:bg-none' />}
           
          >
           
            {/* <Logout /> */}
          </Menu.Item>
        </Menu>

        
        {/* <div className="fixed bottom-0 mx-5">
          <LogoutOutlined />
         <Logout />
        </div> */}
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
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
              }}
            />
            <h2 className='text-xl font-bold text-gradient'> Sales Department </h2>
          </div>
         
          <div className="mr-[3rem]">
          <Button className="mr-[8px] bg-gray-300 h-10 rounded-full mt-3">
            Logout

          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
         
          <div className="mr-[3rem]">
          <Button className="mr-[8px] bg-gray-300 h-10 rounded-full mt-3">
            <UserOutlined />

            
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
