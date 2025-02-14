import React, { useEffect, useRef, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login, addAuth } from '../../redux/services/AuthSlice';

const LOGIN_URL = 'http://localhost:3001/users'; // JSON Server URL

const LoginTest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRef = useRef();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const onFinish = async (values) => {
    setUser(values.username);
    setPwd(values.password);
    try {
      const response = await axios.get(`${LOGIN_URL}?username=${values.username}&password=${values.password}`);
      
      if (response.data.length > 0) {
        const userData = response.data[0];
        
        dispatch(login(userData.username));
        dispatch(addAuth(userData));
        
        localStorage.setItem('user', JSON.stringify(userData));
        setSuccess(true);
        navigate('/');
      } else {
        setErrMsg('Invalid Username or Password');
      }
    } catch (error) {
      setErrMsg('Login Failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[50%] flex justify-center items-center">
        <div className="w-[400px] shadow-md px-8 py-6 bg-white">
          <h2 className='text-2xl font-bold text-center'>Sign In</h2>
          {errMsg && <Alert className='mt-3' message={errMsg} type="error" />}
          {success && <Alert message="You are logged in" type="success" />}
          
          <Form name="login" onFinish={onFinish} className="mt-6">
            <label htmlFor="username">Username</label>
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
              <Input ref={userRef} prefix={<UserOutlined />} placeholder="Username" className='mt-1'/>
            </Form.Item>
            
            <label htmlFor="password">Password</label>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input prefix={<LockOutlined />} type="password" placeholder="Password" className='mt-1' />
            </Form.Item>
            
            <Form.Item>
              <Button block type="primary" htmlType="submit" className='mt-2'>
                Sign In
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center">
            <Link to={'/register'} className='text-blue-500'>Don't have an account? Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTest;
