import React, { useEffect, useState } from 'react';
import './EditRegForm.css';
import { useParams, useNavigate } from 'react-router-dom';
import QRCodeScannerModal from '../qrScannerModal/QRCodeScannerModal';
import ErrorModal from '../errorModal/ErrorModal';
import { IoArrowBackOutline } from "react-icons/io5"; // Importa el icono para el botón de volver

export default function EditRegForm() {
    const { id } = useParams(); // Obtiene el ID del registro
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_id: '',
        event_id: '',
        ticket_code: ''
    });
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [qrModalVisible, setQrModalVisible] = useState(false);
    const [isFormDirty, setIsFormDirty] = useState(false); // Estado para rastrear cambios

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/attendance/${id}`); // Cambiado al nuevo endpoint
                const data = await response.json();
                if (response.ok) {
                    setFormData(data.data);
                } else {
                    alert(data.error || 'Error al obtener datos del registro');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

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

        fetchData();
        fetchUsers();
        fetchEvents();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setIsFormDirty(true); // Indica que el formulario ha cambiado
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/attendance/${id}`, { // Cambiado al nuevo endpoint
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                alert('Registro actualizado exitosamente');
                navigate('/register'); // Navega a la página de registros
            } else {
                setModalMessage(data.error || 'Error al actualizar el registro');
                setErrorModalVisible(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setModalMessage('Error al actualizar el registro');
            setErrorModalVisible(true);
        }
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

    const handleBackClick = () => {
        navigate('/register'); // Navega a la página de registros sin preguntar
    };

    return (
        <div className="register-er-form p-4 bg-white rounded-lg shadow-md">
            <div className="edit-div-cs flex flex-row items-center">
                <button className="button-cs mx-1 px-3 py-2 rounded bg-orange-500 text-white hover:text-black" onClick={handleBackClick}>
                    <IoArrowBackOutline />
                </button>
                <h2 className="custom-wawa">Editar Registro de Asistencia</h2>
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
                        readOnly // Hacer que el campo sea solo lectura
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="submit-custom bg-teal-400 text-white py-2 px-4 rounded hover:bg-teal-500"
                >
                    Actualizar Registro
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
