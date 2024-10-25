import React, { useEffect, useState } from 'react';
import './TicketCategorizedTable.css';
import { FaEdit, FaRegTrashAlt, FaEye } from "react-icons/fa";
import ConfirmDeleteModalU from '../confirmDeleteModalU/ConfirmDeleteModalU';
import { useNavigate, useParams } from 'react-router-dom';

export default function TicketCategorizedTable() {
    const navigate = useNavigate();
    const { category_id } = useParams(); // Obtener category_id de la URL
    const [tickets, setTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ticketsPerPage] = useState(15);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ticketToDelete, setTicketToDelete] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tickets?category_id=${category_id}`); // Cambia a tu endpoint real
                const data = await response.json();
                if (response.ok) {
                    setTickets(data.data); // Asumiendo que 'data' contiene la lista de boletos
                } else {
                    console.error('Error fetching tickets:', data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchTickets();
    }, [category_id]);

    const handleDeleteClick = (id) => {
        setTicketToDelete(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/tickets/${ticketToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Boleto eliminado exitosamente');
                setTickets(tickets.filter(ticket => ticket.id !== ticketToDelete));
            } else {
                alert('Error al eliminar el boleto');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setIsModalOpen(false);
    };

    // Paginación
    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="title-uts text-lg">Administrar Boletos de la Categoría</h2>
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Código</th>
                        <th className="border px-4 py-2">Estado</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTickets.map(ticket => (
                        <tr key={ticket.code}>
                            <td className="border px-4 py-2">{ticket.code}</td>
                            <td className="border px-4 py-2">{ticket.name}</td>
                            <td className="border px-4 py-2">{ticket.category_id}</td>
                            <td className="border px-4 py-2">{ticket.status}</td>
                            <td className="border px-4 py-2">
                                <button className="button-cs mx-1 px-4 py-2 rounded bg-teal-400 text-white hover:text-black" onClick={() => navigate(`/tickets/edit/${ticket.code}`)}>
                                    <FaEdit />
                                </button>
                                <button className="button-cs mx-1 px-4 py-2 rounded bg-red-600 text-white hover:text-black" onClick={() => handleDeleteClick(ticket.code)}>
                                    <FaRegTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Paginación */}
            <div className="flex justify-center mt-4">
                {[...Array(Math.ceil(tickets.length / ticketsPerPage))].map((_, index) => (
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
