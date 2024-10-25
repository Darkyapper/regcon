import React, { useState, useEffect } from 'react';
import './RegisterTicketForm.css';

export default function RegisterTicketForm() {
    const [formData, setFormData] = useState({
        name: '',
        category_id: '',
        quantity: 1 // Inicializa la cantidad en 1
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/ticket-categories'); // Cambia la URL al endpoint de categorías
                const data = await response.json();
                if (response.ok) {
                    setCategories(data.data); // Asumiendo que el formato es { data: [...] }
                } else {
                    alert(data.error || 'Error al obtener categorías');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchCategories();
    }, []);

    const generateUniqueCode = () => {
        // Generar un código único de 6 caracteres alfanuméricos
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, category_id, quantity } = formData;

        // Crear múltiples boletos
        const ticketPromises = [];
        for (let i = 0; i < quantity; i++) {
            const newTicket = {
                code: generateUniqueCode(), // Generar un nuevo código único
                name: name,
                category_id: category_id,
                status: 'disponible' // Establecer el estado por defecto
            };
            ticketPromises.push(
                fetch('http://localhost:3000/tickets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTicket)
                })
            );
        }

        try {
            const responses = await Promise.all(ticketPromises);
            const errors = responses.filter(response => !response.ok);
            if (errors.length > 0) {
                const errorData = await errors[0].json(); // Tomar el primer error
                alert(errorData.error || 'Error al registrar algunos boletos');
            } else {
                alert('Boleto(s) registrado(s) exitosamente');
                setFormData({ name: '', category_id: '', quantity: 1 }); // Resetear el formulario
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="register-ticket-form p-4 bg-white rounded-lg shadow-md">
            <h2 className="custom-wawa text-lg mb-4">Crear Boletos</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Boleto</label>
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
                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Tipo de Boleto</label>
                    <select
                        id="category_id"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    >
                        <option value="" disabled>Selecciona una categoría</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Cantidad</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="1"
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="submit-custom bg-teal-400 text-white py-2 px-4 rounded hover:bg-teal-500"
                >
                    Crear Boletos
                </button>
            </form>
        </div>
    );
}
