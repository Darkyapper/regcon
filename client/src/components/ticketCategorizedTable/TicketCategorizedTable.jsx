import React, { useEffect, useState } from 'react';
import './TicketCategorizedTable.css';
import { FaQrcode, FaRegTrashAlt } from "react-icons/fa";
import { IoArrowBackOutline,  IoCloseOutline  } from "react-icons/io5";
import ConfirmDeleteModalU from '../confirmDeleteModalU/ConfirmDeleteModalU';
import { useNavigate, useParams } from 'react-router-dom';
import QrCodeGenerator from '../qrCodeGenerato/QrCodeGenerato';

export default function TicketCategorizedTable() {
    const navigate = useNavigate();
    const { category_id } = useParams();
    const [tickets, setTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ticketsPerPage] = useState(8);
    const [modalType, setModalType] = useState(null); // Manage which modal to show
    const [ticketToDelete, setTicketToDelete] = useState(null);
    const [selectedTicketCode, setSelectedTicketCode] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tickets/category/${category_id}`);
                const data = await response.json();
                if (response.ok) {
                    setTickets(data.data);
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
        setModalType("delete"); // Set modal type to delete
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/tickets/${ticketToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Boleto eliminado exitosamente');
                setTickets(tickets.filter(ticket => ticket.code !== ticketToDelete));
            } else {
                alert('Error al eliminar el boleto');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setModalType(null); // Close the modal
    };

    // Paginación
    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleBackClick = () => {
        navigate('/tickets');
    };

    const handleAddCategory = () => {
        navigate('/tickets/add');
    };

    const openQrModal = (ticketCode) => {
        setSelectedTicketCode(ticketCode);
        setModalType("qr"); // Set modal type to QR
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <div className="edit-div-cs flex flex-row items-center">
                    <button className="button-cs mx-1 px-3 py-2 rounded bg-orange-500 text-white hover:text-black" onClick={handleBackClick}>
                        <IoArrowBackOutline />
                    </button>
                    <h2 className="title-uts">Administrar Boletos por Categorías</h2>
                </div>
                <button
                    className="bg-teal-400 text-white py-2 px-4 rounded hover:bg-teal-500"
                    onClick={handleAddCategory}
                >
                    Añadir Boletos
                </button>
            </div>
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Código</th>
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Estado</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTickets.map(ticket => (
                        <tr key={ticket.code}>
                            <td className="border px-4 py-2">{ticket.code}</td>
                            <td className="border px-4 py-2">{ticket.name}</td>
                            <td className="border px-4 py-2">{ticket.status}</td>
                            <td className="border px-4 py-2">
                                <button className="button-cs mx-1 px-4 py-2 rounded bg-teal-400 text-white hover:text-black" onClick={() => openQrModal(ticket.code)}>
                                    <FaQrcode />
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
                isOpen={modalType === "delete"}
                onClose={() => setModalType(null)}
                onConfirm={confirmDelete}
            />

            {/* Modal para QR */}
            {modalType === "qr" && selectedTicketCode && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className='mb-2'>Código QR para el Boleto: {selectedTicketCode}</h2>
                        <QrCodeGenerator code={selectedTicketCode} />
                        <button onClick={() => setModalType(null)} className="close-button"><IoCloseOutline /></button>
                    </div>
                </div>
            )}
    
        </div>
    );
}
