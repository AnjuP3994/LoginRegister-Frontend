import React from 'react'
import '../../Styles/auth.css'
import { Col, Container, Row } from 'react-bootstrap'
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../../Services/allAPI';

interface UserData {
    email: string;
    password: string;
}

function Login() {

    const navigate = useNavigate();

    const handleLogin = async (values: UserData) => {
        // console.log('values:',values);
        try {
          const { data } = await loginAPI(values);
          if (data) {
            sessionStorage.setItem("existingUser",JSON.stringify(data.existingUser))  
            console.log('existingUser:',data.existingUser);
            sessionStorage.setItem("token",data.token)
            navigate('/dashboard'); 
          } else {
            Swal.fire({
              title: 'Login failed',
              text: 'Invalid email or password. Please try again.',
              icon: 'error',
            });
          }
        } catch (error) {
          console.error('Login error:', error);
        } 
    };

    const initialValues: UserData = {
        email: "",
        password: ""
      };
    
      const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
      });

  return (
    <div className="bg">
      <Container className='center'>
        <div className="card1 shadow p-5">
          <Row>
            <Col>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  console.log("Form values:", values);
                    handleLogin(values);
                    setSubmitting(false);
                }}
              >
                <Form>
                  <div>
                    <h3 className='fw-bolder'>Welcome Back!</h3>
                    <h5 className='mb-4 fw-bolder'>Sign in to your Account</h5>
                  </div>

                  <div className='mb-3'>
                    <label className='d-flex text-start'>Email</label>
                    <Field name="email" type="text" className="form-control" />
                    <ErrorMessage name="email" component="div" className="text-danger text-start" />
                  </div>
                  <div className='mb-4'>
                    <label className='d-flex text-start'>Password</label>
                    <Field name="password" type="password" className="form-control" />
                    <ErrorMessage name="password" component="div" className="text-danger text-start" />
                  </div>
                  <div>
                    <button type='submit' className='btnlogin mb-3'>Login</button>
                  </div>
                  <p>New to here? <Link to={'/register'} className='text-decoration-none'>Please Register!</Link></p>
                </Form>
              </Formik>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default Login