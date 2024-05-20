import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addSnackbarData } from '../reduxtoolkit/slices/SnakbarMessageSlice';
import { logoutUser } from '../reduxtoolkit/slices/auth/LoginSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useSelector((state) => state.LoginUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(addSnackbarData({ message: 'Logout Successfully', variant: 'success' }));
    navigate('/login');
  }

  return (
    <>
      <div className='mt-12'>
        <div className='flex flex-col items-center'>
          <img
            src="/images/profile.png"
            alt="Not-Found"
            className='w-40 h-40 rounded-full object-cover'
          />
          <h1 className='mt-5 text-3xl font-bold'> {user?.name} </h1>
          <p className='mt-2 text-lg'> {user?.email} </p>
          <button className='bg-red-500 text-white py-2 px-4 rounded mt-5 font-bold' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  )
}

export default Profile