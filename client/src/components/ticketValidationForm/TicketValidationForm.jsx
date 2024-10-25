import React, { useState } from 'react';

const TicketValidationForm = () => {
    const [ticketCode, setTicketCode] = useState('');
    const [ticketInfo, setTicketInfo] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setTicketCode(e.target.value);
    };

    const handleValidate = async () => {
        try {
            const response = await fetch(`http://localhost:3000/tickets/${ticketCode}`); // Adjust the endpoint as necessary
            const data = await response.json();
            if (response.ok) {
                setTicketInfo(data.data); // Assuming data contains the ticket information
                setError(''); // Clear any previous errors
            } else {
                setError('Este boleto no existe o es inválido.');
                setTicketInfo(null); // Clear ticket info
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error al validar el boleto.'); // Handle error
            setTicketInfo(null);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg mb-4">Validar Boletos</h2>
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

            {/* Error message */}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {/* Ticket Information */}
            {ticketInfo && (
                <div className="mt-4 p-4 border rounded bg-green-100">
                    <h3 className="text-lg font-bold">Información del Boleto</h3>
                    <p><strong>Nombre:</strong> {ticketInfo.name}</p>
                    <p><strong>Código:</strong> {ticketInfo.code}</p>
                    <p><strong>Tipo:</strong> {ticketInfo.type}</p>
                    <p><strong>Costo:</strong> ${ticketInfo.price}</p>
                    <p><strong>Descripción:</strong> {ticketInfo.description}</p>
                    <p><strong>Estado:</strong> {ticketInfo.status}</p>
                    <p><strong>Dueño:</strong> {ticketInfo.owner}</p>
                </div>
            )}
        </div>
    );
};

export default TicketValidationForm;
