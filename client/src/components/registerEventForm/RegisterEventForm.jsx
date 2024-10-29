import React, { useEffect, useState } from 'react';
import './RegisterEventForm.css';

export default function RegisterEventForm() {
    const [formData, setFormData] = useState({
        name: '',
        event_date: '',
        location: '',
        description: '',
        category_id: '' // Cambiado a category_id
    });

    const [categories, setCategories] = useState([]); // Estado para las categorías de boletos

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/ticket-categories'); // Endpoint para obtener categorías de boletos
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
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                alert('Evento creado exitosamente');
                setFormData({ name: '', event_date: '', location: '', description: '', category_id: '' }); // Reset form
            } else {
                alert(data.error || 'Error al crear el evento');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="register-event-form p-4 bg-white rounded-lg shadow-md">
            <h2 className="custom-wawa text-lg mb-4">Crear Nuevo Evento</h2>
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
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción corta del evento.</label>
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
                    Crear Evento
                </button>
            </form>
        </div>
    );
}
