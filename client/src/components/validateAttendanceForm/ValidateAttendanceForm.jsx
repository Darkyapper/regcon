import React, { useState } from 'react';
import QRCodeScannerModal from '../qrScannerModal/QRCodeScannerModal';
import ErrorModal from '../errorModal/ErrorModal';
import './ValidateAttendanceForm.css';

export default function ValidateAttendanceForm() {
    const [ticketCode, setTicketCode] = useState('');
    const [ticketInfo, setTicketInfo] = useState(null);
    const [error, setError] = useState('');
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [qrModalVisible, setQrModalVisible] = useState(false);

    const handleInputChange = (e) => {
        setTicketCode(e.target.value);
    };

    const handleValidate = async () => {
        if (!ticketCode.trim()) {
            setError('El código del boleto no puede estar vacío.');
            return;
        }

        try {
            const workgroupId = localStorage.getItem('workgroup_id'); // Obtener el workgroup_id de la sesión
            const response = await fetch(`http://localhost:3000/ticket-view-code/${ticketCode}?workgroup_id=${workgroupId}`);
            const data = await response.json();

            if (response.ok) {
                setTicketInfo(data.data);
                await validateAttendance(data.data); // Validar la asistencia después de obtener información del boleto
            } else {
                setError(data.message || 'Este boleto no existe o es inválido.');
                setTicketInfo(null);
                setModalMessage('No se encontró registro de asistencia para este boleto.');
                setErrorModalVisible(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setModalMessage('Error al validar el boleto.');
            setErrorModalVisible(true);
        }
    };

    const validateAttendance = async (ticketData) => {
        try {
            const attendanceResponse = await fetch(`http://localhost:3000/attendance?ticket_code=${ticketData.code}&workgroup_id=${ticketData.workgroup_id}`);
            const attendanceData = await attendanceResponse.json();

            if (attendanceResponse.ok && attendanceData.data.length > 0) {
                const attendanceRecord = attendanceData.data[0];

                if (attendanceRecord.status === 'Sin Asistencia') {
                    // Actualizar estado a 'Ha Asistido'
                    await updateAttendance(attendanceRecord.id);
                } else {
                    setModalMessage('Este usuario ya ha sido validado.');
                    setErrorModalVisible(true);
                }
            } else {
                setModalMessage('No se encontró registro de asistencia para este boleto.');
                setErrorModalVisible(true);
            }
        } catch (error) {
            console.error('Error al validar asistencia:', error);
            setModalMessage('Error al validar la asistencia.');
            setErrorModalVisible(true);
        }
    };

    const updateAttendance = async (attendanceId) => {
        try {
            const response = await fetch(`http://localhost:3000/attendance-status/${attendanceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'Ha Asistido' }) // Solo cambiar el estado
            });
    
            if (response.ok) {
                alert('Asistencia registrada correctamente');
                // Aquí puedes reiniciar los datos del formulario si es necesario
            } else {
                setModalMessage('Error al actualizar el estado de asistencia.');
                setErrorModalVisible(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setModalMessage('Error al actualizar la asistencia');
            setErrorModalVisible(true);
        }
    };
    
    return (
        <div className="custom-cs-ab validate-attendance-form p-4 bg-white rounded-lg shadow-md">
            <h2 className="title-uts-avs">Registrar Asistencia</h2>
            <div className="mb-4">
                <label htmlFor="ticketCode" className="block text-sm font-medium text-gray-700">Código del Boleto</label>
                <input
                    type="text"
                    id="ticketCode"
                    value={ticketCode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border rounded-md p-2"
                />
                <button 
                    type="button" 
                    onClick={() => setQrModalVisible(true)} 
                    className='bg-yellow-400 py-1 px-2 mt-1 rounded font-medium hover:bg-yellow-600'
                >
                    Escanear por QR
                </button>
            </div>
            <button
                onClick={handleValidate}
                className="bg-teal-400 text-white py-2 px-4 rounded hover:bg-teal-500"
            >
                Validar Boleto
            </button>

            {/* Información del ticket */}
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

            {/* Modal para mensajes de error */}
            {errorModalVisible && (
                <ErrorModal
                    message={modalMessage}
                    onClose={() => setErrorModalVisible(false)}
                />
            )}

            {/* Modal de Escaneo QR */}
            {qrModalVisible && (
                <QRCodeScannerModal
                    onClose={() => setQrModalVisible(false)}
                    onCodeDetected={setTicketCode}
                />
            )}
        </div>
    );
}
