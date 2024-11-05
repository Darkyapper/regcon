import React, { useEffect, useState } from 'react';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';
import QRCodeScannerModal from '../qrScannerModal/QRCodeScannerModal';
import ErrorModal from '../errorModal/ErrorModal';

export default function RegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_id: '',
        event_id: '',
        ticket_code: '',
        workgroup_id: '' // Agregar workgroup_id aquí
    });
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [qrModalVisible, setQrModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null); // Para almacenar el evento seleccionado

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/users');
                const data = await response.json();
                if (response.ok) {
                    setUsers(data.data);
                } else {
                    alert(data.error || 'Error al obtener los usuarios');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchEvents = async () => {
            const workgroupId = localStorage.getItem('workgroup_id'); // Obtén el workgroup_id

            if (!workgroupId) {
                console.error('No se encontró workgroup_id en el local storage');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/events?workgroup_id=${workgroupId}`);
                const data = await response.json();
                if (response.ok) {
                    setEvents(data.data);
                } else {
                    alert(data.error || 'Error al obtener los eventos');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUsers();
        fetchEvents();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Si el evento es cambiado, se busca su información
        if (name === 'event_id') {
            const event = events.find(event => event.id === value);
            setSelectedEvent(event); // Actualiza el evento seleccionado
        }
    };

    const handleTicketValidation = async () => {
        try {
            const response = await fetch(`http://localhost:3000/tickets/${formData.ticket_code}`);
            const data = await response.json();
            if (!response.ok || data.data.status !== "Sin Usar") {
                setModalMessage('Este boleto es inválido o ya ha sido usado.');
                setErrorModalVisible(true);
                return false;
            }

            // Verifica que el tipo de boleto sea el correcto para el evento
            if (selectedEvent) {
                const eventResponse = await fetch(`http://localhost:3000/events/${selectedEvent.id}`);
                const eventData = await eventResponse.json();

                if (eventResponse.ok) {
                    const eventCategoryId = eventData.data.category_id; // Asegúrate que tu evento tenga un campo category_id

                    if (data.data.category_id !== eventCategoryId) {
                        setModalMessage(`Este boleto no es válido para el evento '${selectedEvent.name}'. Se requiere un boleto de tipo adecuado.`);
                        setErrorModalVisible(true);
                        return false;
                    }
                } else {
                    setModalMessage('Error al obtener información del evento.');
                    setErrorModalVisible(true);
                    return false;
                }
            }

            return true;
        } catch (error) {
            console.error('Error:', error);
            setModalMessage('Error al validar el boleto.');
            setErrorModalVisible(true);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValidTicket = await handleTicketValidation();
        if (isValidTicket) {
            // Obtener el workgroup_id
            const workgroupId = localStorage.getItem('workgroup_id');
            if (!workgroupId) {
                setModalMessage('No se encontró workgroup_id en el almacenamiento local.');
                setErrorModalVisible(true);
                return;
            }

            // Añadir el workgroup_id a formData
            const attendanceData = { ...formData, workgroup_id: workgroupId };

            try {
                const response = await fetch('http://localhost:3000/attendance', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(attendanceData)
                });
                const data = await response.json();
                if (response.ok) {
                    alert('Registro de asistencia creado exitosamente');
                    setFormData({ user_id: '', event_id: '', ticket_code: '' }); // Reset form
                } else {
                    setError(data.error || 'Error al registrar la asistencia');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Error al registrar la asistencia');
            }
        }
    };

    const handleAddUser = () => {
        navigate('/users/add');
    };

    const handleCodeDetected = (code) => {
        setFormData({ ...formData, ticket_code: code }); // Actualiza el código del boleto en el formulario
    };

    const closeModal = () => {
        setQrModalVisible(false);
    };

    const closeErrorModal = () => {
        setErrorModalVisible(false);
        setModalMessage('');
    };

    return (
        <div className="register-r-form p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="custom-wawa">Pre Registro a Evento</h2>
                <button
                    className="bg-teal-400 text-white py-2 px-4 rounded hover:bg-teal-500"
                    onClick={handleAddUser}
                >
                    Registrar Usuario Nuevo
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">Usuario</label>
                    <select
                        id="user_id"
                        name="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    >
                        <option value="">Seleccione un usuario</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="event_id" className="block text-sm font-medium text-gray-700">Evento</label>
                    <select
                        id="event_id"
                        name="event_id"
                        value={formData.event_id}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    >
                        <option value="">Seleccione un evento</option>
                        {events.map(event => (
                            <option key={event.id} value={event.id}>{event.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="ticket_code" className="block text-sm font-medium text-gray-700">Código del Boleto</label>
                    <input
                        type="text"
                        id="ticket_code"
                        name="ticket_code"
                        value={formData.ticket_code}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                    <button 
                        type="button" 
                        onClick={() => setQrModalVisible(true)} // Cambiado a qrModalVisible
                        className='bg-yellow-400 py-1 px-2 mt-1 rounded font-medium hover:bg-yellow-600'
                    >
                        Escanear por QR
                    </button>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="submit-custom bg-teal-400 text-white py-2 px-4 rounded hover:bg-teal-500"
                >
                    Registrar Asistencia
                </button>
            </form>

            {/* Modal para mensajes de error */}
            {errorModalVisible && (
                <ErrorModal
                    message={modalMessage}
                    onClose={closeErrorModal}
                />
            )}

            {/* Modal de Escaneo QR */}
            {qrModalVisible && (
                <QRCodeScannerModal
                    onClose={closeModal}
                    onCodeDetected={handleCodeDetected}
                />
            )}
        </div>
    );
}
