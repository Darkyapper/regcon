import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserProfile.css';

export default function UserProfile() {
    const { id } = useParams(); // Obtener el ID del usuario desde la ruta
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUserProfile();
    }, [id]);

    const fetchUserProfile = async () => {
        const workgroupId = localStorage.getItem('workgroup_id'); // Obtener el workgroup_id de la sesión
        try {
            const response = await fetch(`http://localhost:3000/admin/${id}?workgroup_id=${workgroupId}`); // Modificar endpoint para incluir workgroup_id
            const data = await response.json();
            if (response.ok) {
                setUser(data.data); // Almacenar la información del usuario
            } else {
                setError(data.message || 'Error al obtener el perfil del usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error al obtener el perfil del usuario');
        }
    };

    return (
        <div className='custom-xuxu'>
            {error && <p className="text-red-500">{error}</p>} {/* Mostrar error si hay */}
            {user ? (
                <div className='profile-container'>
                    <h2 className="title text-2xl font-bold">Perfil de Administrador</h2>
                    <div className="profile-info mt-4 flex items-center">
                        <img src={user.picture || 'default-avatar.png'} alt="Foto de perfil" className="rounded-full w-32 h-32 mr-4" />
                        <div className="user-details">
                            <p><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Teléfono:</strong> {user.phone}</p>
                            <p><strong>Sobre Mí:</strong> {user.description}</p>
                            <p><strong>Fecha de Registro:</strong> {new Date(user.registration_date).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Cargando información del administrador...</p> // Mensaje mientras se carga la información
            )}
        </div>
    );
}
