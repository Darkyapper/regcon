import React from 'react';
import './ConfigDash.css';
import { Link } from 'react-router-dom';
import { IoSettingsSharp, IoHelpBuoy } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { ImFilesEmpty } from "react-icons/im";
import { IoIosLogOut, IoMdPrint } from "react-icons/io";

export default function ConfigDash() {
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
                    <IoMdPrint className="mr-2 text-lg" />
                    Configuración de impresión y marca
                </button>
                <button className="action-button flex items-center">
                    <ImFilesEmpty className="mr-2 text-lg" />
                    Documentación Oficial
                </button>
                <button className="action-button flex items-center">
                    <IoHelpBuoy className="mr-2 text-lg" />
                    Ayuda y soporte
                </button>
                <Link to="/" className='action-button'>
                        <IoIosLogOut className="mr-2 text-lg" />
                        Cerrar Sesión
                </Link>
                <span className="block text-sm sm:text-center">
                    © 2024 RegCon™. All Rights Reserved.
                </span>
            </div>
        </div>
    );
}
