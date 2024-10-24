import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import './EditUserForm.css';
import ConfirmDiscardChangesModal from '../confirmDiscardChangesModal/ConfirmDiscardChangesModal';

export default function EditUserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormDirty, setIsFormDirty] = useState(false); // Track if form data is modified

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setFormData(data.data);
                } else {
                    alert(data.error || 'Error al obtener datos del usuario');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setIsFormDirty(true); // Mark form as dirty
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                alert('Usuario actualizado exitosamente');
                navigate('/users');
            } else {
                alert(data.error || 'Error al actualizar el usuario');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBackClick = () => {
        if (isFormDirty) {
            setIsModalOpen(true); // Show the confirmation modal
        } else {
            navigate('/users'); // Navigate back without prompt
        }
    };

    const confirmDiscardChanges = () => {
        setIsModalOpen(false);
        navigate('/users'); // Navigate back discarding changes
    };

    return (
        <div className="register-user-form p-4 bg-white rounded-lg shadow-md">
            <div className="edit-div-cs flex flex-row items-center">
                <button className="button-cs mx-1 px-3 py-2 rounded bg-orange-500 text-white hover:text-black" onClick={handleBackClick}>
                    <IoArrowBackOutline />
                </button>
                <h2 className="text-lg">Editar Usuario</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Apellido</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Número de Teléfono</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="sumbit-custom bg-teal-400 text-white py-2 px-4 rounded hover:bg-teal-500"
                >
                    Guardar
                </button>
            </form>

            {/* Modal de confirmación de cambios no guardados */}
            <ConfirmDiscardChangesModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={confirmDiscardChanges}
            />
        </div>
    );
}
