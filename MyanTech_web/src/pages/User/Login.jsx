import React, { useEffect, useRef, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAuth, login } from '../../redux/services/AuthSlice';
import axios from '../../api/axios';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => setErrMsg(''), []);

  const handleLogin = async (values) => {

    
    try {
      const { data } = await axios.post('/auth/login', values, {
        // headers: { 'Content-Type': 'application/json' }
      });

      
      
      if (data.length) {
        const userData = data[0];
        dispatch(login(userData.username));
        dispatch(addAuth(userData));
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/');
      } else {
        setErrMsg('Invalid Username or Password');
      }
    } catch {
      setErrMsg('Login Failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-100 to-white">
      <div className="w-[498px] shadow-md px-12 py-10 bg-white">
        <h2 className='text-[40px] font-bold bg-button bg-clip-text text-transparent'>Sign In</h2>
        {errMsg && <Alert className='mt-5' message={errMsg} type="error" />}
        <Form name="login" onFinish={handleLogin} className='mt-6'>
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

export default Login;
