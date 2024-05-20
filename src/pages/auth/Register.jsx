import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AbInputField from '../../components/inputfields/AbInputField';
import AppLayout from '../../components/layout/AppLayout';
import AbButton from '../../components/inputfields/AbButton';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../reduxtoolkit/slices/auth/RegisterSlice';
import { addSnackbarData } from '../../reduxtoolkit/slices/SnakbarMessageSlice';

const Register = () => {
    const [data, setData] = useState({
        name: '',
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

        if (!data.name) errors.name = 'Name is required';
        if (!data.email) errors.email = 'Email is required';
        if (!data.password) {
            errors.password = 'Password is required';
        } else if (data.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(registerUser(data)).then((result) => {
                if (result.payload.message) {
                    dispatch(addSnackbarData({ message: result?.payload?.message, variant: 'success' }));
                    navigate('/login');
                    setData({
                        name: '', email: '', password: '',
                    })
                } else {
                    dispatch(addSnackbarData({ message: result?.payload?.error, variant: 'error' }));
                }
            });
        }
    };

    return (
        <AppLayout
            header={true}
        >
            <div className='flex justify-center items-center h-full'>
                <form className='flex flex-col gap-6 bg-secondary p-10 rounded-xl z-10' onSubmit={handleSubmit}>
                    <h1 className='text-primary text-2xl md:text-4xl font-bold '> Create An Account To Get Started </h1>
                    <div className='flex flex-col md:flex-row gap-5 md:mt-3'>
                        <AbInputField
                            label='Name'
                            name='name'
                            type='text'
                            value={data.name}
                            onchange={handleChange}
                            placeholder='Enter Name'
                            error={errors.name}
                        />
                        <AbInputField
                            label='Email'
                            name='email'
                            type='email'
                            value={data.email}
                            onchange={handleChange}
                            placeholder='Enter Email'
                            error={errors.email}
                        />
                    </div>
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
                        text='Register'
                        type='submit'
                        className='rounded-lg py-5 text-lg'
                    // icon={ArrowForwardIcon}
                    />
                    <p>Already have an account? <Link to='/login' className='text-primary font-bold italic hover:underline'> Login </Link> </p>
                </form>
            </div>
        </AppLayout>
    )
}

export default Register