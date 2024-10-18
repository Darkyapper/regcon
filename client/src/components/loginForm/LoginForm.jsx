import React from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Aquí añadir la lógica para validar las credenciales del usuario
        // Si las credenciales son correctas, redirigir a la página del dashboard
        navigate('/dashboard');
    };

    return (
        <div className='main-container'>
            <div className='custom-form'>
                <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                    <div className="info-form">
                        <h1 className='title-form'>
                            Iniciar Sesión
                        </h1>
                        <p className='description-form'>
                            Inicia sesión con las credenciales proporcionadas por tu administrador
                        </p>
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Correo
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="admin@mymail.com"
                            required=""
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="border rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required=""
                        />
                    </div>
                    <div className='button-to-access'>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Acceder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
