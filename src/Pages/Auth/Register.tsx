import React from 'react'
import '../../Styles/auth.css'
import { Col, Container, Row } from 'react-bootstrap'
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI } from '../../Services/allAPI';

interface UserData {
    fname: string;
    surname: string;
    phone: string;
    email: string;
    password: string;
}

function Register() {

    const navigate = useNavigate();

    const handleRegister = async (values: UserData, resetForm: () => void) => {
        console.log('registerValues:',values);
        try {
        const {data} = await registerAPI(values);
        console.log('register response:', data);
        if (data) {
            Swal.fire({
            title: "Registered successfully",
            text: `${data.fname} has been registered.`,
            icon: "success"
            });
        } else {
            Swal.fire({
            title: "You're already existed!",
            text: 'Please login...',
            icon: "warning"
            });
        }
        resetForm();
        navigate('/');
        } catch (error) {
        console.error("Registration error:", error);
        }
    };

    const initialValues: UserData = {
        fname: "",
        surname: "",
        phone: "",
        email: "",
        password: ""
      };
    
      const validationSchema = Yup.object({
        fname: Yup.string().matches(/^[a-zA-Z ]+$/, 'Letters only').required('First Name is required'),
        surname: Yup.string().matches(/^[a-zA-Z ]+$/, 'Letters only').required('Surname is required'),
        phone: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone number is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().matches(/^(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{3,}$/, 'Invalid password! Requires at least 1 special character from (!@#$%^&*)')
          .required('Password is required')
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
                    handleRegister(values, resetForm);
                    setSubmitting(false);
                }}
              >
                <Form>
                  <div>
                    <h3 className='fw-bolder'>Welcome Back!</h3>
                    <h5 className='mb-4 fw-bolder'>Sign up to your Account</h5>
                    <div className='d-flex justify-content-between gap-2 mb-3'>
                      <div>
                        <label className='d-flex text-start'>First Name</label>
                        <Field name="fname" type="text" className="form-control" />
                        <ErrorMessage name="fname" component="div" className="text-danger text-start" />
                      </div>
                      <div>
                        <label className='d-flex text-start'>Surname</label>
                        <Field name="surname" type="text" className="form-control" />
                        <ErrorMessage name="surname" component="div" className="text-danger text-start" />
                      </div>
                    </div>
                    <div className='mb-3'>
                      <label className='d-flex text-start'>Phone No</label>
                      <Field name="phone" type="text" className="form-control" />
                      <ErrorMessage name="phone" component="div" className="text-danger text-start" />
                    </div>
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
                    <button type='submit' className='btnregis mb-3'>Register</button>
                  </div>
                  <p>Already have an Account? <Link to={'/'} className='text-decoration-none'>Please Login Here</Link></p>
                </Form>
              </Formik>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default Register