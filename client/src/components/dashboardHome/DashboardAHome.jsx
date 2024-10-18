import React from 'react';
import './DashboardAHome.css';
import { FiFilePlus, FiCheckCircle } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function DashboardAHome() {
    const handleActionClick = (action) => {
        // Lógica para manejar clics en las acciones
        console.log(`Action clicked: ${action}`);
        // Aquí puedes redirigir a otras páginas o manejar la acción como desees
    };

    const currentHour = new Date().getHours();

    const getGreeting = () => {
        if (currentHour < 12) {
            return "¡Bienvenido, buenos días!";
        } else if (currentHour < 18) {
            return "¡Bienvendo, buenas tardes!";
        } else {
            return "¡Bienvenido buenas noches!";
        }
    };

    return (
        <div className="custom-content p-4">
            <h1 className="title-c text-2xl font-bold mb-4">{getGreeting()}</h1>
            <h2 className="text-lg mb-4">Acciones Rápidas</h2>
            <div className="grid grid-cols-3 gap-4">
                <div
                    className="button-custom bg-teal-400 p-4 rounded-lg shadow-md text-white text-center cursor-pointer"
                    onClick={() => handleActionClick('Registrar')}
                >
                    <h3 className="button-t-c">Registrar</h3>
                    <div className="flex justify-center items-center">
                        <FiFilePlus className="icon-custom w-16 h-16" />
                    </div>
                </div>

                <div
                    className="button-custom bg-teal-400 p-4 rounded-lg shadow-md text-white text-center cursor-pointer"
                    onClick={() => handleActionClick('Validar Boletos')}
                >
                    <h3 className="button-t-c">Validar Boletos</h3>
                    <div className="flex justify-center items-center">
                        <FiCheckCircle className="icon-custom w-16 h-16" />
                    </div>
                </div>
                <div
                    className="button-custom bg-teal-400 p-4 rounded-lg shadow-md text-white text-center cursor-pointer"
                    onClick={() => handleActionClick('Crear Evento')}
                >
                    <h3 className="button-t-c">Crear Evento</h3>
                    <div className="flex justify-center items-center">
                        <HiOutlinePencilSquare className="icon-custom w-16 h-16" />
                    </div>
                </div>
            </div>
        </div>
    );
}
