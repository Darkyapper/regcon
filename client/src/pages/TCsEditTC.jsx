import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import EditTCForm from '../components/editTCForm/EditTCForm';

const TCsEditTC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirigir al inicio de sesión si no hay token
        }
    }, [navigate]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-grow">
                <Sidebar />
                <div className="flex-grow ml-64 p-4 mt-16">
                    <EditTCForm />
                </div>
            </div>
        </div>
    );
};

export default TCsEditTC; // Asegúrate de que esto esté presente
