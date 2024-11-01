// NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css'; // Asegúrate de agregar estilos si es necesario

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found">
            <h1>404 - Página No Encontrada</h1>
            <p>Lo sentimos, la página que buscas no existe.</p>
            <button onClick={() => navigate('/')} className="go-home-button">
                Volver a Inicio
            </button>
        </div>
    );
};

export default NotFound;
