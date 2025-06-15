import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Pages/shared/Navbar/Navbar';
import Footer from '../Components/Pages/shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='font-inter max-w-[1500px] mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;