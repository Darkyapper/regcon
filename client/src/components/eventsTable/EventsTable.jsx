import React, { useEffect, useState } from 'react';
import './EventsTable.css';
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import ConfirmDeleteModalU from '../confirmDeleteModalU/ConfirmDeleteModalU';
import { useNavigate } from 'react-router-dom';


export default function EventsTable() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(5); // Cambiado de usersPerPage a eventsPerPage
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null); // Cambiado de setUserToDelete a setEventToDelete

    useEffect(() => {
        const fetchEvents = async () => { // Cambiado fetchUsers a fetchEvents
            try {
                const response = await fetch('http://localhost:3000/events');
                const data = await response.json();
                if (response.ok) {
                    setEvents(data.data); // Cambiado setUsers a setEvents
                } else {
                    console.error('Error fetching events:', data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchEvents(); // Cambiado fetchUsers a fetchEvents
    }, []);

    const handleDeleteClick = (id) => {
        setEventToDelete(id); // Cambiado setUserToDelete a setEventToDelete
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/events/${eventToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Evento eliminado exitosamente');
                setEvents(events.filter(event => event.id !== eventToDelete)); // Cambiado de users a events
            } else {
                alert('Error al eliminar el evento');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setIsModalOpen(false);
    };

    // Paginación
    const indexOfLastEvent = currentPage * eventsPerPage; // Cambiado de usersPerPage a eventsPerPage
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage; // Cambiado de usersPerPage a eventsPerPage
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent); // Cambiado de users a events

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="title-uts">Administrar Eventos</h2>
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Evento</th>
                        <th className="border px-4 py-2">Fecha</th>
                        <th className="border px-4 py-2">Ubicación</th>
                        <th className="border px-4 py-2">Descripción</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEvents.map(event => (
                        <tr className='events-custom-cs' key={event.id}>
                            <td className="border px-4 py-2">{event.id}</td>
                            <td className="border px-4 py-2">{event.name}</td>
                            <td className="border px-4 py-2">{event.event_date}</td>
                            <td className="border px-4 py-2">{event.location}</td>
                            <td className="border px-4 py-2">{event.description}</td>
                            <td className="border px-4 py-2">
                                <button className="button-cs mx-1 px-4 py-2 rounded bg-teal-400 text-white hover:text-black" onClick={() => navigate(`/events/edit/${event.id}`)}>
                                    <FaEdit />
                                </button>
                                <button className="button-cs mx-1 px-4 py-2 rounded bg-red-600 text-white hover:text-black" onClick={() => handleDeleteClick(event.id)}>
                                    <FaRegTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Paginación */}
            <div className="flex justify-center mt-4">
                {[...Array(Math.ceil(events.length / eventsPerPage))].map((_, index) => ( // Cambiado de users a events
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
