import React, { useEffect, useState } from 'react';
import './TicketsTable.css';
import { FaEdit, FaRegTrashAlt, FaEye } from "react-icons/fa";
import ConfirmDeleteModalU from '../confirmDeleteModalU/ConfirmDeleteModalU';
import { useNavigate } from 'react-router-dom';

export default function TicketsTable() {
    const navigate = useNavigate();
    const [ticketCategories, setTicketCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ticketCategoriesPerPage] = useState(15);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    useEffect(() => {
        const fetchTicketCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/ticket-categories-with-counts'); // Endpoint que devuelve categorías de boletos con conteo
                const data = await response.json();
                if (response.ok) {
                    setTicketCategories(data.data); // Cargar categorías de boletos
                } else {
                    console.error('Error fetching ticket categories:', data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchTicketCategories();
    }, []);

    const handleDeleteClick = (id) => {
        setCategoryToDelete(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/ticket-categories/${categoryToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Categoría de boleto eliminada exitosamente');
                setTicketCategories(ticketCategories.filter(tc => tc.id !== categoryToDelete));
            } else {
                alert('Error al eliminar la categoría de boleto');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setIsModalOpen(false);
    };

    const handleValidate = () => {
        navigate('/tickets/validate'); // Navegar a la página de validación de boletos
    };  

    // Paginación
    const indexOfLastCategory = currentPage * ticketCategoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - ticketCategoriesPerPage;
    const currentCategories = ticketCategories.slice(indexOfFirstCategory, indexOfLastCategory);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="title-uts">Administrar Boletos</h2>
                <button
                    className="bg-teal-400 text-white py-2 px-4 rounded hover:bg-teal-500"
                    onClick={handleValidate}
                >
                    Validar Boleto
                </button>
            </div>
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Cantidad de Boletos</th>
                        <th className="border px-4 py-2">Tipo</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCategories.map(tc => (
                        <tr key={tc.id}>
                            <td className="border px-4 py-2">{tc.id}</td>
                            <td className="border px-4 py-2">{tc.name}</td>
                            <td className="border px-4 py-2">{tc.ticket_count}</td>
                            <td className="border px-4 py-2">{tc.description}</td>
                            <td className="border px-4 py-2">
                                <button className="button-cs mx-1 px-4 py-2 rounded bg-teal-400 text-white hover:text-black" onClick={() => navigate(`/tickets/categories/${tc.id}`)}>
                                    <FaEye />
                                </button>
                                <button className="button-cs mx-1 px-4 py-2 rounded bg-teal-400 text-white hover:text-black" onClick={() => navigate(`/ticket-categories/edit/${tc.id}`)}>
                                    <FaEdit />
                                </button>
                                <button className="button-cs mx-1 px-4 py-2 rounded bg-red-600 text-white hover:text-black" onClick={() => handleDeleteClick(tc.id)}>
                                    <FaRegTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Paginación */}
            <div className="flex justify-center mt-4">
                {[...Array(Math.ceil(ticketCategories.length / ticketCategoriesPerPage))].map((_, index) => (
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
}
