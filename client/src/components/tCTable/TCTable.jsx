import React, { useEffect, useState } from 'react';
import './TCTable.css';
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import ConfirmDeleteModalU from '../confirmDeleteModalU/ConfirmDeleteModalU';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";

export default function TCTable() {
    const navigate = useNavigate();
    const [ticketCategories, setTicketCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ticketCategoriesPerPage] = useState(8);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    useEffect(() => {
        const fetchTicketCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/ticket-categories');
                const data = await response.json();
                if (response.ok) {
                    setTicketCategories(data.data); // Suponiendo que 'data' contiene la lista de categorías
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
                setTicketCategories(ticketCategories.filter(category => category.id !== categoryToDelete));
            } else {
                alert('Error al eliminar la categoría de boleto');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setIsModalOpen(false);
    };

    // Paginación
    const indexOfLastCategory = currentPage * ticketCategoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - ticketCategoriesPerPage;
    const currentTicketCategories = ticketCategories.slice(indexOfFirstCategory, indexOfLastCategory);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleBackClick = () => {
        navigate('/tickets/add'); // Navegar de vuelta a la página de registro de boletos
    };

    const handleAddCategory = () => {
        navigate('/ticket-categories/add'); // Navegar a la página de añadir categorías
    };

    return (
        <div className="custom-cs-a p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <div className="edit-div-cs flex flex-row items-center">
                    <button className="button-cs mx-1 px-3 py-2 rounded bg-orange-500 text-white hover:text-black" onClick={handleBackClick}>
                        <IoArrowBackOutline />
                    </button>
                    <h2 className="title-uts-av">Administrar Categorías de Boletos</h2>
                </div>
                <button
                    className="bg-teal-400 text-white py-2 px-4 rounded hover:bg-teal-500"
                    onClick={handleAddCategory}
                >
                    Añadir Categoría
                </button>
            </div>
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Precio</th>
                        <th className="border px-4 py-2">Descripción</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTicketCategories.map(category => (
                        <tr key={category.id}>
                            <td className="border px-4 py-2">{category.id}</td>
                            <td className="border px-4 py-2">{category.name}</td>
                            <td className="border px-4 py-2">${category.price}</td>
                            <td className="border px-4 py-2">{category.description}</td>
                            <td className="border px-4 py-2">
                                <button className="button-cs mx-1 px-4 py-2 rounded bg-teal-400 text-white hover:text-black" onClick={() => navigate(`/ticket-categories/edit/${category.id}`)}>
                                    <FaEdit />
                                </button>
                                <button className="button-cs mx-1 px-4 py-2 rounded bg-red-600 text-white hover:text-black" onClick={() => handleDeleteClick(category.id)}>
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
};
