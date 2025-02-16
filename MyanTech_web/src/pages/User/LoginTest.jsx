import React, { useEffect, useRef, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login, addAuth } from '../../redux/services/AuthSlice';

const LOGIN_URL = 'http://localhost:8080';

const LoginTest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => setErrMsg(''), []);

  const onFinish = async ({ username, password }) => {
    try {
      const { data } = await axios.post(`${LOGIN_URL}/auth/login`, { username, password });
      // if (data && data.token) {
        dispatch(login(username));
        dispatch(addAuth(data));
        localStorage.setItem('user', JSON.stringify(data));
        setSuccess(true);
        navigate('/sales/dashboard');
      // } else {
      //   setErrMsg('Invalid Username or Password');
      // }
    } catch {
      setErrMsg('Login Failed');
    }
  };

 
  return (
  <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-100 to-white">
       <div className="w-[498px] shadow-md px-12 py-10 bg-white">
         <h2 className='text-[40px] mb-4 font-bold bg-button bg-clip-text text-transparent text-center'>MyanTech</h2>

         <h4 className='text-[30px] font-bold text-center bg-button bg-clip-text text-transparent '>Sign In</h4>
         {errMsg && <Alert className='mt-5' message={errMsg} type="error" />}
         <Form name="login" onFinish={onFinish} className='mt-6'>
           <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
             <Input prefix={<UserOutlined />} placeholder="Username" className='h-[55px] text-[14px]' />
           </Form.Item>
           <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
             <Input.Password prefix={<LockOutlined />} placeholder="Password" className='h-[55px] text-[14px]' />
           </Form.Item>
           <Form.Item>
             <Button type="primary" htmlType="submit" block className='h-[55px] text-[20px] bg-button text-white'>Sign In</Button>
           </Form.Item>
         </Form>
       </div>
     </div>
  );
};

export default LoginTest;
