import React, { useState } from 'react';
import './RegisterForm.css';

export default function RegisterForm() {
    const [existingUser, setExistingUser] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        eventId: '',
        userId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
    };

    return (
        <div className="register-form-container">
            <h1>Registro de Asistentes</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label>
                        <input
                            type="radio"
                            name="userType"
                            value="existing"
                            checked={existingUser}
                            onChange={() => setExistingUser(true)}
                        />
                        Usar Usuario Existente
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="userType"
                            value="new"
                            checked={!existingUser}
                            onChange={() => setExistingUser(false)}
                        />
                        Crear Nuevo Usuario
                    </label>
                </div>

                {existingUser ? (
                    <div className="form-group">
                        <label htmlFor="userId">Selecciona Usuario:</label>
                        <select
                            name="userId"
                            id="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona un usuario</option>
                            <option value="1">Usuario 1</option>
                            <option value="2">Usuario 2</option>
                        </select>
                    </div>
                ) : (
                    <>
                        <div className="form-group">
                            <label htmlFor="firstName">Nombre:</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Apellido:</label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico:</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono:</label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                )}

                <div className="form-group">
                    <label htmlFor="eventId">Selecciona Evento:</label>
                    <select
                        name="eventId"
                        id="eventId"
                        value={formData.eventId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un evento</option>
                        <option value="1">Evento 1</option>
                        <option value="2">Evento 2</option>
                    </select>
                </div>

                <button type="submit" className="submit-button">Registrar</button>
            </form>
        </div>
    );
}
