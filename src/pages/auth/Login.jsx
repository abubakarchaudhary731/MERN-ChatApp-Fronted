import React, { useState } from 'react'
import AbInputField from '../../components/inputfields/AbInputField';
import AppLayout from '../../components/layout/AppLayout';
import AbButton from '../../components/inputfields/AbButton';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../reduxtoolkit/slices/auth/LoginSlice';
import { addSnackbarData } from '../../reduxtoolkit/slices/SnakbarMessageSlice';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!data.email) errors.email = 'Email is required';
    if (!data.password) errors.password = 'Password is required'
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(loginUser(data)).then((result) => {
        if (result.payload.message) {
          dispatch(addSnackbarData({ message: result?.payload?.message, variant: 'success' }));
          navigate('/');
          setData({
            email: '', password: '',
          })
        } else {
          dispatch(addSnackbarData({ message: result?.payload?.error, variant: 'error' }));
        }
      })
    }
  };

  return (
    <AppLayout
      header={true}
    >
      <div className='flex justify-center items-center h-full'>
        <form className='flex flex-col gap-6 bg-secondary p-10 rounded-xl min-w-[590px]' onSubmit={handleSubmit}>
          <h1 className='text-primary text-2xl md:text-4xl font-bold '> Login to Your Account </h1>
          <AbInputField
            label='Email'
            name='email'
            type='email'
            value={data.email}
            onchange={handleChange}
            placeholder='Enter Email'
            error={errors.email}
          />
          <AbInputField
            label='Password'
            name='password'
            type='password'
            value={data.password}
            onchange={handleChange}
            placeholder='Enter password'
            error={errors.password}
          />
          <AbButton
            text='Login'
            type='submit'
            className='rounded-lg py-5 text-lg'
          // icon={ArrowForwardIcon}
          />
          <p>Don't have an account? <Link to='/register' className='text-primary font-bold italic hover:underline'> Register </Link> </p>
        </form>
      </div>
    </AppLayout>
  )
}

export default Login