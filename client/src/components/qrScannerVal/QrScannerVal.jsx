import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import './QrScannerVal.css';

export default function QRCodeReaderVal() {
    const [result, setResult] = useState('');
    const [ticketInfo, setTicketInfo] = useState(null);
    const [error, setError] = useState('');

    // Maneja el escaneo exitoso del QR
    const handleScan = async (data) => {
        if (data) {
            const code = data.text; // Asegúrate de que estás extrayendo el código correctamente
            setResult(code);

            try {
                const response = await fetch(`http://localhost:3000/ticket-view/${code.trim()}`); // Ajusta la URL según sea necesario
                const info = await response.json();
                if (response.ok) {
                    setTicketInfo(info.data); // Almacena la información del boleto
                    setError(''); // Limpia el mensaje de error si la validación fue exitosa
                } else {
                    setError('Este boleto no existe o es inválido.'); // Mensaje de error si el boleto es inválido
                    setTicketInfo(null); // Limpia la información del boleto
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Error al validar el boleto.'); // Mensaje de error si ocurre un error en la validación
                setTicketInfo(null);
            }
        }
    };

    // Maneja los errores de escaneo
    const handleError = (err) => {
        console.error('Error al escanear:', err);
    };

    return (
        <div className="qr-scanner-container">
            <h2 className="text-lg mb-4">Escanear Código QR</h2>
            <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
            {error && (
                <div className="mt-4 p-4 border rounded bg-red-100">
                    <p className="text-red-500">{error}</p> {/* Mensaje de error */}
                </div>
            )}
            {ticketInfo && (
                <div className="mt-4 p-4 border rounded bg-green-100">
                    <h3 className="text-lg font-bold">Información del Boleto</h3>
                    <p><strong>Código:</strong> {ticketInfo.code}</p>
                    <p><strong>Nombre:</strong> {ticketInfo.ticket_name}</p>
                    <p><strong>Categoría:</strong> {ticketInfo.category_name}</p>
                    <p><strong>Costo:</strong> ${ticketInfo.category_price}</p>
                    <p><strong>Descripción:</strong> {ticketInfo.category_description}</p>
                    <p><strong>Estado:</strong> {ticketInfo.status}</p>
                </div>
            )}
        </div>
    );
}
