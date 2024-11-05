import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterTicketForm.css';

export default function RegisterTicketForm() {
    const navigate = useNavigate();

    const goToAdeministrarCategorias = (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto
        navigate('/ticket-categories');
    };

    const [formData, setFormData] = useState({
        name: '',
        category_id: '',
        quantity: 1, // Inicializa la cantidad en 1
        workgroup_id: '' // Agregar workgroup_id aquí
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const workgroupId = localStorage.getItem('workgroup_id'); // Obtén el workgroup_id

            if (!workgroupId) {
                console.error('No se encontró workgroup_id en el local storage');
                return;
            }

            try {
                // Modificar la URL para incluir el workgroup_id
                const response = await fetch(`http://localhost:3000/ticket-categories?workgroup_id=${workgroupId}`);
                const data = await response.json();
                if (response.ok) {
                    setCategories(data.data); // Cargar categorías de boletos
                    setFormData(prevState => ({
                        ...prevState,
                        workgroup_id: workgroupId // Asignar workgroup_id aquí
                    }));
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
        const { name, category_id, quantity, workgroup_id } = formData;

        // Crear múltiples boletos
        const ticketPromises = [];
        for (let i = 0; i < quantity; i++) {
            const newTicket = {
                code: generateUniqueCode(), // Generar un nuevo código único
                name: name,
                category_id: category_id,
                status: 'Sin Usar', // Establecer el estado por defecto
                workgroup_id: workgroup_id // Incluir workgroup_id
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
                setFormData({ name: '', category_id: '', quantity: 1, workgroup_id: '' }); // Resetear el formulario
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al registrar los boletos.'); // Mensaje de error
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
                    <button
                        type="button" // Asegúrate de que sea un botón de tipo "button"
                        onClick={goToAdeministrarCategorias}
                        className='bg-yellow-400 py-1 px-2 mt-1 rounded font-medium hover:bg-yellow-600'
                    >
                        Administrar Categorías
                    </button>
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
