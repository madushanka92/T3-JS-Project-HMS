import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/css/LoginPage.css";

const admin_page= ()=> {
    const navigate = useNavigate();

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));

        if(!user || user.role !== "admin"){
            navigate('/')
        }
    })

    return(
        <div className='admin'>
             <h1>Admin Dashboard</h1>
             {/* Admin content */}
        </div>
    );
}