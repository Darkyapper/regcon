import React, { useEffect, useState } from 'react';
import './UsersTable.css';
import { FaRegTrashAlt } from "react-icons/fa";
import ConfirmDeleteModalU from '../confirmDeleteModalU/ConfirmDeleteModalU';
import { useNavigate } from 'react-router-dom';

export default function UsersTable() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(15);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const workgroupId = localStorage.getItem('workgroup_id'); // Obtén el workgroup_id

            if (!workgroupId) {
                console.error('No se encontró workgroup_id en el local storage');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/usersmembership?workgroup_id=${workgroupId}`); // Cambiar endpoint
                const data = await response.json();
                if (response.ok) {
                    setUsers(data.data); // Asegúrate de que 'data' contenga la lista de usuarios
                } else {
                    console.error('Error fetching users:', data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleDeleteClick = (id) => {
        setUserToDelete(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${userToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Usuario eliminado exitosamente');
                setUsers(users.filter(user => user.id !== userToDelete));
            } else {
                alert('Error al eliminar el usuario');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setIsModalOpen(false);
    };

    // Paginación
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="title-uts">Administrar Usuarios Registrados en Eventos</h2>
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Apellido</th>
                        <th className="border px-4 py-2">Correo</th>
                        <th className="border px-4 py-2">Teléfono</th>
                        <th className="border px-4 py-2">Evento</th>
                        <th className="border px-4 py-2">Estado</th>
                        <th className="border px-4 py-2">Fecha de Registro</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(user => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{user.user_first_name}</td>
                            <td className="border px-4 py-2">{user.user_last_name}</td>
                            <td className="border px-4 py-2">{user.user_email}</td>
                            <td className="border px-4 py-2">{user.user_phone}</td>
                            <td className="border px-4 py-2">{user.event_name}</td>
                            <td className="border px-4 py-2">{user.status}</td>
                            <td className="border px-4 py-2">{new Date(user.registration_date).toLocaleString()}</td>
                            <td className="border px-4 py-2">
                                <button 
                                    className="button-cs mx-1 px-4 py-2 rounded bg-red-600 text-white hover:text-black" 
                                    onClick={() => handleDeleteClick(user.id)}
                                >
                                    <FaRegTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Paginación */}
            <div className="flex justify-center mt-4">
                {[...Array(Math.ceil(users.length / usersPerPage))].map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => paginate(index + 1)} 
                        className={`button-cs mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-teal-400 text-white' : 'bg-gray-200'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Modal de confirmación */}
            <ConfirmDeleteModalU 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={confirmDelete}
            />
        </div>
    );
}
