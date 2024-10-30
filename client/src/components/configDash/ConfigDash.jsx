import React from 'react';
import './ConfigDash.css';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { IoSettingsSharp, IoHelpBuoy } from "react-icons/io5";
import { FaUserCircle, FaKey, FaDatabase } from "react-icons/fa";
import { ImFilesEmpty } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";

export default function ConfigDash() {
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleLogout = () => {
        // Eliminar el token del almacenamiento local
        localStorage.removeItem('token'); // Cambia 'token' al nombre que estés usando
        // Redirigir a la página de inicio de sesión
        navigate('/'); // Asegúrate de que esta ruta sea la correcta
    };

    return (
        <div className="recommended-actions p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-lg mb-4">Configuraciones</h1>
            <div className="flex flex-col gap-4">
                <button className="action-button flex items-center">
                    <IoSettingsSharp className="mr-2 text-lg" />
                    Configuración de la aplicación
                </button>
                <button className="action-button flex items-center">
                    <FaUserCircle className="mr-2 text-lg" />
                    Configuración del perfil
                </button>
                <button className="action-button flex items-center">
                    <FaDatabase className="mr-2 text-lg" />
                    Configuración de bases de datos
                </button>
                <button className="action-button flex items-center">
                    <ImFilesEmpty className="mr-2 text-lg" />
                    Documentación Oficial
                </button>
                <button className="action-button flex items-center">
                    <FaKey className="mr-2 text-lg" />
                    Licencia y activación
                </button>
                <button className="action-button flex items-center">
                    <IoHelpBuoy className="mr-2 text-lg" />
                    Ayuda y soporte
                </button>
                {/* Cambia Link a button para manejar el logout */}
                <button onClick={handleLogout} className='action-button flex items-center'>
                    <IoIosLogOut className="mr-2 text-lg" />
                    Cerrar Sesión
                </button>
                <span className="block text-sm sm:text-center">
                    © 2024 RegCon™. All Rights Reserved.
                </span>
            </div>
        </div>
    );
}
