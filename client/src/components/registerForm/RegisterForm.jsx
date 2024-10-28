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
        ticket_code: ''
    });
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [qrModalVisible, setQrModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

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
            try {
                const response = await fetch('http://localhost:3000/events');
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
            try {
                const response = await fetch('http://localhost:3000/registro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
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

    const goToAdeministrarCategorias = (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto
        navigate('/ticket-categories');
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
        <div className="register-user-form p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="custom-wawa">Crear Registro de Asistencia</h2>
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
