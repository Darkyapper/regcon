import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaUser } from 'react-icons/fa';
import { IoGrid } from "react-icons/io5";
import './Navbar.css';
import logo from '../../assets/regcon-logo.png'

export default function Navbar() {
    // Obtener la información del administrador actual desde localStorage
    const adminId = localStorage.getItem('user_id');
    const adminPicture = localStorage.getItem('admin_picture') || 'https://pbs.twimg.com/media/Gbmg1syWgAAcmGW?format=png&name=360x360'; // Imagen por defecto si no hay

    return (
        <nav className="custom-navbar fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center">
                    <img src={logo} className="custom-logo" alt="RegCon Logo" />
                </div>

                <div className="custom-icons flex items-center space-x-4">
                    <button className="notis hover:text-white">
                        <FaBell />
                    </button>
                    <button className="grid-c hover:text-white">
                        <IoGrid />
                    </button>
                    <Link to={`/profile/${adminId}`}>
                        <img
                            src={adminPicture}
                            alt="User"
                            className="profile w-10 h-10 rounded-full border border-gray-600"
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
