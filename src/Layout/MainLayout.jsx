import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Pages/shared/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div className='font-inter'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;