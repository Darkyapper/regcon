import React, { useEffect, useState } from 'react';
import './WorkgroupMembersTable.css';
import { FaRegTrashAlt } from "react-icons/fa";
import ConfirmDeleteModalU from '../confirmDeleteModalU/ConfirmDeleteModalU';
import { useNavigate } from 'react-router-dom';

export default function WorkgroupMembersTable() {
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [membersPerPage] = useState(15);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            const workgroupId = localStorage.getItem('workgroup_id'); // Obtén el workgroup_id

            if (!workgroupId) {
                console.error('No se encontró workgroup_id en el local storage');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/workgroupdetails/${workgroupId}`); // Cambiar endpoint
                const data = await response.json();
                if (response.ok) {
                    setMembers(data.data); // Asegúrate de que 'data' contenga la lista de miembros
                } else {
                    console.error('Error fetching members:', data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchMembers();
    }, []);

    const handleDeleteClick = (id) => {
        setMemberToDelete(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${memberToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Miembro eliminado exitosamente');
                setMembers(members.filter(member => member.id !== memberToDelete));
            } else {
                alert('Error al eliminar el miembro');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setIsModalOpen(false);
    };

    // Paginación
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="title-uts">Miembros del Grupo de Trabajo</h2>
            <table className="tablas min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Apellido</th>
                        <th className="border px-4 py-2">Rol</th>
                        <th className="border px-4 py-2">Teléfono</th>
                        <th className="border px-4 py-2">Correo</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMembers.map(member => (
                        <tr key={member.id}>
                            <td className="border px-4 py-2">{member.admin_first_name}</td>
                            <td className="border px-4 py-2">{member.admin_last_name}</td>
                            <td className="border px-4 py-2">{member.role_name}</td>
                            <td className="border px-4 py-2">{member.admin_phone}</td>
                            <td className="border px-4 py-2">{member.admin_email}</td>
                            <td className="border px-4 py-2">
                                <button 
                                    className="button-cs mx-1 px-4 py-2 rounded bg-red-600 text-white hover:text-black" 
                                    onClick={() => handleDeleteClick(member.id)}
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
                {[...Array(Math.ceil(members.length / membersPerPage))].map((_, index) => (
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
