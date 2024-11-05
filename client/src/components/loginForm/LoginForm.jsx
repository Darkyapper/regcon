import React, { useState } from 'react'; // Importar useState para manejar el estado
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(''); // Estado para el correo electrónico
    const [password, setPassword] = useState(''); // Estado para la contraseña
    const [error, setError] = useState(''); // Estado para manejar errores

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            if (response.ok) {
                // Guardar el token, workgroup_id y user_id en localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('workgroup_id', data.workgroup_id); 
                localStorage.setItem('user_id', data.user_id); // Almacenar el ID del usuario
                navigate('/dashboard'); // Navega a la página de dashboard o donde desees
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error('Error en la solicitud de inicio de sesión:', error);
            setError('Error al intentar iniciar sesión.');
        }
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
                            Inicia sesión con las credenciales con las que te registraste en RegCon™ o las proporcionadas por tu administrador
                        </p>
                    </div>
                    {error && <p className="text-red-500">{error}</p>} {/* Mostrar mensaje de error si hay */}
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
                            value={email} // Vincular el valor del input al estado
                            onChange={(e) => setEmail(e.target.value)} // Actualizar el estado
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
                            value={password} // Vincular el valor del input al estado
                            onChange={(e) => setPassword(e.target.value)} // Actualizar el estado
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
