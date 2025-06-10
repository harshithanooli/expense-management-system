import React, {useState, useEffect} from 'react'
import {Form, Input, message} from 'antd';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
const Login = () => {
     //form submit
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
  const submitHandler = async(values) => {
        try{
            setLoading(true)
            const {data} = await axios.post("/users/login", values);
            setLoading(false)
            message.success("Logged in successfully")
            localStorage.setItem('user', JSON.stringify({...data.user,password:'' }))
            navigate("/")

            
        }catch(error){
            setLoading(false)
            message.error('Invalid email or password')
        }
    
    };

      //prevent for login user
  useEffect(() => {
    if(localStorage.getItem('user')) {
      navigate("/");
    }
  }, [navigate]);
  // return (
  //   <>
  //       <div className="register-page">
  //           {loading && <Spinner />}
  //           <Form layout='vertical' onFinish={submitHandler}>
  //           <h1>Login</h1>
            
  //           <Form.Item label="Email" name="email">
  //               <Input type="email" />
  //           </Form.Item>
  //           <Form.Item label="Password" name="password">
  //               <Input type="password"/>
  //           </Form.Item>
  //           <div className="d-flex justify-content-between">
  //               <Link to="/register">Not a user? Click here to register</Link>
  //               <button className="btn btn-primary">Login</button>
  //           </div>
  //           </Form>
  //       </div>
  //   </>
  // )
  return (
    <>
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
        {loading && <Spinner />}
        <div className="row shadow-lg p-4 bg-white rounded" style={{ width: '90%', maxWidth: '1000px' }}>
          
          <div className="col-md-6 d-flex flex-column align-items-center justify-content-center text-center">
            <h2 className="mb-4 fw-bold">FinSmart - Expense Management System</h2>
            <img
              src="/loginPage.jpg"  
              alt="expense tracking list"
              className="img-fluid rounded"
              style={{ maxHeight: '300px' }}
            />
          </div>
  
          <div className="col-md-6 bg-secondary bg-opacity-10 p-4 rounded">
            <h3 className="text-center mb-4 fw-bold">Login Form</h3>
            <Form layout="vertical" onFinish={submitHandler}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please enter your email' }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
  
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
  
              <div className="d-flex justify-content-between align-items-center mt-2">
                <Link to="/register">Not a user? <span className="text-primary">Click here to register!</span></Link>
                <button className="btn btn-primary" type="submit">Login</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
  
}



export default Login