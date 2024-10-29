import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecommendedActions.css';

export default function RecommendedActions() {

    const navigate = useNavigate();

    const selectActionClic = (action) => {
        if (action === 'Crear boletos nuevos') {
            navigate('/tickets/add');
        } else if (action === 'Registre a sus usuarios') {
            navigate('/users/add');
        } else if (action === 'Crear e imprimir informes') {
            console.log('Crear e imprimir informes');
        } else if (action === 'Conozca y aprenda a usar RegCon') {
            console.log('¡Conozca y aprenda a usar RegCon!');
        }
    }

    return (
        <div className="recommended-actions p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg mb-4">Acciones Recomendadas</h2>
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => selectActionClic('Crear boletos nuevos')} className="action-button">
                    Crear boletos nuevos
                </button>
                <button onClick={() => selectActionClic('Registre a sus usuarios')} className="action-button">
                    Registre a sus usuarios
                </button>
                <button onClick={() => selectActionClic('Crear e imprimir informes')} className="action-button">
                    Configure su base de datos
                </button>
                <button onClick={() => selectActionClic('Conozca y aprenda a usar RegCon')} className="action-button">
                    ¡Conozca y aprenda a usar RegCon!
                </button>
            </div>
        </div>
    );
}
