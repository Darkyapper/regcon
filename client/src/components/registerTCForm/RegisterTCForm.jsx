import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import './RegisterTCForm.css';
import { IoArrowBackOutline } from "react-icons/io5"; // Asegúrate de importar el icono

export default function RegisterTCForm() {
    const navigate = useNavigate(); // Inicializa el hook de navegación

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        workgroup_id: '' // Agregar workgroup_id aquí
    });

    useEffect(() => {
        // Obtener el workgroup_id del local storage y guardarlo en el formulario
        const workgroupId = localStorage.getItem('workgroup_id');
        if (workgroupId) {
            setFormData(prevState => ({
                ...prevState,
                workgroup_id: workgroupId // Asignar workgroup_id aquí
            }));
        } else {
            console.error('No se encontró workgroup_id en el local storage');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/ticket-categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Enviar formData que ahora incluye workgroup_id
            });
            const data = await response.json();
            if (response.ok) {
                alert('Categoría de boletos registrada exitosamente');
                setFormData({ name: '', price: '', description: '', workgroup_id: '' }); // Resetear el formulario
            } else {
                alert(data.error || 'Error al registrar la categoría de boletos');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en la conexión con el servidor'); // Notificar al usuario sobre el error
        }
    };

    const handleBackClick = () => {
        navigate('/ticket-categories'); // Navegar de vuelta a la página de categorías
    };

    return (
        <div className="register-user-form p-4 bg-white rounded-lg shadow-md">
            <div className="edit-div-cs flex flex-row items-center">
                <button className="button-cs mx-1 px-3 py-2 rounded bg-orange-500 text-white hover:text-black" onClick={handleBackClick}>
                    <IoArrowBackOutline />
                </button>
                <h2 className="title-uts text-lg">Crear Categoría de Boletos</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre de la categoría</label>
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
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Costo</label>
                    <input
                        type="number" // Cambiado a type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción breve de la categoría</label>
                    <input
                        type="text" // Cambiado a type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="submit-custom bg-teal-400 text-white py-2 px-4 rounded hover:bg-teal-500"
                >
                    Crear Categoría
                </button>
            </form>
        </div>
    );
}
