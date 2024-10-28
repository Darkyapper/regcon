import React, { useEffect, useState } from 'react';
import './RegisterTable.css';
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import ConfirmDeleteModalU from '../confirmDeleteModalU/ConfirmDeleteModalU';
import { useNavigate } from 'react-router-dom';

export default function RegisterTable() {
    const navigate = useNavigate();
    const [registrations, setRegistrations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [registrationsPerPage] = useState(15);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [registrationToDelete, setRegistrationToDelete] = useState(null);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const response = await fetch('http://localhost:3000/registrations/details');
                const data = await response.json();
                if (response.ok) {
                    setRegistrations(data.data); // Suponiendo que 'data' contiene la lista de registros
                } else {
                    console.error('Error fetching registrations:', data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchRegistrations();
    }, []);

    const handleDeleteClick = (id) => {
        setRegistrationToDelete(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/registro/${registrationToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Registro eliminado exitosamente');
                setRegistrations(registrations.filter(registration => registration.registration_id !== registrationToDelete));
            } else {
                alert('Error al eliminar el registro');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setIsModalOpen(false);
    };

    // Paginación
    const indexOfLastRegistration = currentPage * registrationsPerPage;
    const indexOfFirstRegistration = indexOfLastRegistration - registrationsPerPage;
    const currentRegistrations = registrations.slice(indexOfFirstRegistration, indexOfLastRegistration);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="custom-cs p-4 bg-white rounded-lg shadow-md">
            <h2 className="title-uts">Administrar Registros de Asistencia</h2>
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Apellido</th>
                        <th className="border px-4 py-2">Evento</th>
                        <th className="border px-4 py-2">Código del Boleto</th>
                        <th className="border px-4 py-2">Nombre del Boleto</th>
                        <th className="border px-4 py-2">Categoría del Boleto</th>
                        <th className="border px-4 py-2">Fecha de Registro</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRegistrations.map(registration => (
                        <tr key={registration.registration_id}>
                            <td className="border px-4 py-2">{registration.registration_id}</td>
                            <td className="border px-4 py-2">{registration.user_first_name}</td>
                            <td className="border px-4 py-2">{registration.user_last_name}</td>
                            <td className="border px-4 py-2">{registration.event_name}</td>
                            <td className="border px-4 py-2">{registration.ticket_code}</td>
                            <td className="border px-4 py-2">{registration.ticket_name}</td>
                            <td className="border px-4 py-2">{registration.ticket_category}</td>
                            <td className="border px-4 py-2">{registration.registration_date}</td>
                            <td className="border px-4 py-2">
                                <button className="button-cs mx-1 px-4 py-2 rounded bg-teal-400 text-white hover:text-black" onClick={() => navigate(`/register/edit/${registration.registration_id}`)}>
                                    <FaEdit />
                                </button>
                                <button className="button-cs mx-1 px-4 py-2 rounded bg-red-600 text-white hover:text-black" onClick={() => handleDeleteClick(registration.registration_id)}>
                                    <FaRegTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Paginación */}
            <div className="flex justify-center mt-4">
                {[...Array(Math.ceil(registrations.length / registrationsPerPage))].map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className={`button-cs mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-teal-400 text-white' : 'bg-gray-200'}`}>
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
};
