import React from 'react';
import './DashboardAHome.css';

export default function DashboardAHome() {
    const handleActionClick = (action) => {
        // Lógica para manejar clics en las acciones
        console.log(`Action clicked: ${action}`);
        // Aquí puedes redirigir a otras páginas o manejar la acción como desees
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">¡Bienvenido, buenos días!</h1>
            <h2 className="text-lg font-semibold mb-4">Acciones Rápidas</h2>
            <div className="grid grid-cols-3 gap-4">
                <div 
                    className="bg-teal-400 p-4 rounded-lg shadow-md text-white text-center cursor-pointer" 
                    onClick={() => handleActionClick('Registrar')} // Llama a la función al hacer clic
                >
                    <h3 className="font-bold">Registrar</h3>
                    <svg
                        className="w-12 h-12 mx-auto mb-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 14H8v-2h3zm4-2h-3V8h3zm1-10h-3v3h3z" />
                    </svg>
                </div>
                <div 
                    className="bg-teal-400 p-4 rounded-lg shadow-md text-white text-center cursor-pointer" 
                    onClick={() => handleActionClick('Validar Boletos')}
                >
                    <h3 className="font-bold">Validar Boletos</h3>
                    <svg
                        className="w-12 h-12 mx-auto mb-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 22c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                    </svg>
                </div>
                <div 
                    className="bg-teal-400 p-4 rounded-lg shadow-md text-white text-center cursor-pointer" 
                    onClick={() => handleActionClick('Crear Evento')}
                >
                    <h3 className="font-bold">Crear Evento</h3>
                    <svg
                        className="w-12 h-12 mx-auto mb-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12C24 5.373 18.627 0 12 0zm0 22c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
