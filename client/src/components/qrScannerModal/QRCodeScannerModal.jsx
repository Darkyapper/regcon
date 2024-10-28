import React from 'react';
import QrScanner from 'react-qr-scanner';
import './QrScannerVal.css';

const QRCodeScannerModal = ({ onClose, onCodeDetected }) => {
    const handleScan = async (data) => {
        if (data && data.text) {
            onCodeDetected(data.text);
            onClose(); // Cierra el modal después de detectar el código
        }
    };

    const handleError = (err) => {
        console.error('Error al escanear:', err);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="text-lg mb-4">Escanear Código QR</h2>
                <QrScanner
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%', height: 'auto' }} // Asegúrate de que se ajuste al modal
                />
                <button onClick={onClose} className="close-button">Cerrar</button>
            </div>
        </div>
    );
};

export default QRCodeScannerModal;
