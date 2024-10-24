import React from 'react';
import './ConfirmDeleteModalU.css';

export default function ConfirmDeleteModalU ({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="custom-mdls fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-lg font-semibold mb-4">Confirmar Eliminación</h2>
                <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                <div className="mt-4 flex justify-end">
                    <button className="button-cs mr-2 px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancelar</button>
                    <button className="button-cs px-4 py-2 bg-red-600 text-white rounded" onClick={onConfirm}>Eliminar</button>
                </div>
            </div>
        </div>
    );
};