import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from '../components/PrivateRoute';

const PrivateLayout = () => {
  return (
    <PrivateRoute>
      <div className='flex flex-col md:flex-row flex-no-wrap h-screen'>
        <Sidebar />
        <div className='flex w-full h-full'>
          <div className='w-full h-full overflow-y-scroll'>
            <Outlet />
          </div>
        </div>
        <ToastContainer hideProgressBar autoClose={3000} />
      </div>
    </PrivateRoute>
  );
};

export default PrivateLayout;
