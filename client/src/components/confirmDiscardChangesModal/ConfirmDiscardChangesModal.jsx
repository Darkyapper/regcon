import React from 'react';
import './ConfirmDiscardChangesModal.css';
import { CiCircleAlert } from "react-icons/ci";

export default function ConfirmDiscardChangesModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="custom-mdlsd fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-md">
                <div className="flex justify-center">
                    <CiCircleAlert className="text-red-600 text-6xl" />
                </div>
                <h2 className="title-mdlsd  mb-4">Advertencia</h2>
                <p>Hay cambios sin guardar. ¿Estás seguro de que deseas salir sin guardar?</p>
                <div className="mt-4 flex justify-end">
                    <button className="button-cs mr-2 px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancelar</button>
                    <button className="button-cs px-4 py-2 bg-red-600 text-white rounded" onClick={onConfirm}>Salir Sin Guardar</button>
                </div>
            </div>
        </div>
    );
}
