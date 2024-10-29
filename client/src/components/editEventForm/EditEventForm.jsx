import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import './EditEventForm.css';
import ConfirmDiscardChangesModal from '../confirmDiscardChangesModal/ConfirmDiscardChangesModal';

export default function EditEventForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        event_date: '',
        location: '',
        description: '',
        category_id: '' // Nuevo campo para la categoría de boleto
    });
    const [categories, setCategories] = useState([]); // Estado para las categorías de boletos
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormDirty, setIsFormDirty] = useState(false); // Track if form data is modified

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`http://localhost:3000/events/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setFormData(data.data);
                } else {
                    alert(data.error || 'Error al obtener datos del evento');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/ticket-categories'); // Obtener categorías de boletos
                const data = await response.json();
                if (response.ok) {
                    setCategories(data.data); // Suponiendo que 'data' contiene la lista de categorías
                } else {
                    alert(data.error || 'Error al obtener categorías de boletos');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchEvent();
        fetchCategories(); // Llamar a la función para obtener categorías
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setIsFormDirty(true); // Mark form as dirty
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                alert('Evento actualizado exitosamente');
                navigate('/events');
            } else {
                alert(data.error || 'Error al actualizar el evento');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBackClick = () => {
        if (isFormDirty) {
            setIsModalOpen(true); // Show the confirmation modal
        } else {
            navigate('/events'); // Navigate back without prompt
        }
    };

    const confirmDiscardChanges = () => {
        setIsModalOpen(false);
        navigate('/events'); // Navigate back discarding changes
    };

    return (
        <div className="register-user-form p-4 bg-white rounded-lg shadow-md">
            <div className="edit-div-cs flex flex-row items-center">
                <button className="button-cs mx-1 px-3 py-2 rounded bg-orange-500 text-white hover:text-black" onClick={handleBackClick}>
                    <IoArrowBackOutline />
                </button>
                <h2 className="text-lg">Editar Evento</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del evento</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="event_date" className="block text-sm font-medium text-gray-700">Fecha del evento</label>
                    <input
                        type="date"
                        id="event_date"
                        name="event_date"
                        value={formData.event_date}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Ubicación</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción corta del evento</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Categoría de Boleto</label>
                    <select
                        id="category_id"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    >
                        <option value="">Seleccione una categoría</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
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
