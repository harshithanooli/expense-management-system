import React, {useState, useEffect} from 'react'
import {Form, Input, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  //form submit
  const submitHandler = async (values) => {
    try {
      setLoading(true)
      await axios.post("/users/register", values);
      message.success("Registration Successful");
      setLoading(false)
      navigate("/login")
    }
    catch(error){
      setLoading(false)
      message.error('Invalid username or password');
    }
  };

  //prevent for login user
  useEffect(() => {
    if(localStorage.getItem('user')) {
      navigate("/");
    }
  }, [navigate]);
  // return  (
  //   <>
  //   <div className="register-page">
  //     {loading && <Spinner />}
  //     <Form layout='vertical' onFinish={submitHandler}>
  //       <h1>Sign Up</h1>
  //       <Form.Item label="Name" name="name">
  //         <Input />
  //       </Form.Item>
  //       <Form.Item label="Email" name="email">
  //         <Input type="email" />
  //       </Form.Item>
  //       <Form.Item label="Password" name="password">
  //         <Input type="password"/>
  //       </Form.Item>
  //       <div className="d-flex justify-content-between">
  //         <Link to="/login">Already registered? Click here to login</Link>
  //         <button className="btn btn-primary">Register</button>
  //       </div>
  //     </Form>
  //   </div>
    
  //   </>
  // )
  return (
    <>
      {loading && <Spinner />}
      <div
        className="d-flex align-items-center justify-content-center vh-100"
        style={{
          backgroundImage: `url('/registerBackground.jpg')`, // your image path inside /public
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backdropFilter: 'blur(2px)',
        }}
      >
        {/* <div
          className="p-4 bg-white bg-opacity-75 rounded shadow"
          style={{ width: '100%', maxWidth: '400px' }}
        > */}

      <div
        className="p-4 rounded shadow"
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.88)', // higher opacity (88%)
          backdropFilter: 'blur(6px)', // optional: softer blur
          border: '1px solid rgba(255, 255, 255, 0.3)', // optional: light border
        }}
      >

          <h3 className="text-center mb-4 fw-bold">Sign Up</h3>
          <Form layout="vertical" onFinish={submitHandler}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input placeholder="Full Name" />
            </Form.Item>
  
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter your email' }]}
            >
              <Input type="email" placeholder="Email" />
            </Form.Item>
  
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter a password' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
  
            <div className="d-flex justify-content-between align-items-center mt-2">
              <Link to="/login">Already registered?</Link>
              <button className="btn btn-primary" type="submit">Register</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
  
}

export default Register