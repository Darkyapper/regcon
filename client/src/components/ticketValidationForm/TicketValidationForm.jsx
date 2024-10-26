import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TicketValidationForm.css';

export default function TicketValidationForm() {
    const navigate = useNavigate();
    const [ticketCode, setTicketCode] = useState('');
    const [ticketInfo, setTicketInfo] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setTicketCode(e.target.value);
    };

    const handleValidate = async () => {
        if (!ticketCode.trim()) {
            setError('El código del boleto no puede estar vacío.'); // Error si el campo está vacío
            setTicketInfo(null);
            return;
        }
    
        console.log("Validando código del boleto:", ticketCode); // Agregado para depuración
    
        try {
            const response = await fetch(`http://localhost:3000/ticket-view/${ticketCode}`);
            const data = await response.json();
            console.log("Respuesta de la API:", data); // Agregado para depuración
            if (response.ok) {
                setTicketInfo(data.data);
                setError('');
            } else {
                setError('Este boleto no existe o es inválido.');
                setTicketInfo(null);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error al validar el boleto.');
            setTicketInfo(null);
        }
    };
    

    const handleAddCategory = () => {
        navigate('/tickets/validate/qr'); // Navegar a la página de añadir categorías
    };

    return (
        <div className="custom-cs-tb-tb p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="title-uts">Validar Boletos</h2>
                <button
                    className="bg-teal-400 text-white py-2 px-4 rounded hover:bg-teal-500"
                    onClick={handleAddCategory}
                >
                    Escaneo por QR
                </button>
            </div>
            <div className="mb-4">
                <label htmlFor="ticketCode" className="block text-sm font-medium text-gray-700">Código del Boleto</label>
                <input
                    type="text"
                    id="ticketCode"
                    value={ticketCode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="Escribe el código del boleto"
                />
            </div>
            <button
                onClick={handleValidate}
                className="bg-teal-400 text-white py-2 px-4 rounded hover:bg-teal-500"
            >
                Validar Boleto
            </button>

            {/* Mensaje de error */}
            {error && (
                <div className="mt-4 p-4 border rounded bg-red-100">
                    <p className="text-red-500">{error}</p>
                </div>
            )}

            {/* Información del ticket */}
            {ticketInfo && (
                <div className="mt-4 p-4 border rounded bg-green-100">
                    <h3 className="text-lg font-bold">Información del Boleto</h3>
                    <p><strong>Código:</strong> {ticketInfo.code}</p>
                    <p><strong>Nombre:</strong> {ticketInfo.ticket_name}</p>
                    <p><strong>Categoria:</strong> {ticketInfo.category_name}</p>
                    <p><strong>Costo:</strong> ${ticketInfo.category_price}</p>
                    <p><strong>Descripción:</strong> {ticketInfo.category_description}</p>
                    <p><strong>Estado:</strong> {ticketInfo.status}</p>
                </div>
            )}
        </div>
    );
};
