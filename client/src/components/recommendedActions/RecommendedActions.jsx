import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecommendedActions.css';

export default function RecommendedActions() {

    const navigate = useNavigate();

    const selectActionClic = (action) => {
        if (action === 'Crear boletos nuevos') {
            navigate('/tickets/add');
        } else if (action === 'Crear informes') {
            console.log('¡Conozca y aprenda a usar RegCon!');
        } else if (action === 'Conozca a su equipo') {
            navigate('/my-workgroup');
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
                <button onClick={() => selectActionClic('Crear informes')} className="action-button">
                    Crear informes
                </button>
                <button onClick={() => selectActionClic('Conozca a su equipo')} className="action-button">
                    Conozca a su equipo
                </button>
                <button onClick={() => selectActionClic('Conozca y aprenda a usar RegCon')} className="action-button">
                    ¡Conozca y aprenda a usar RegCon!
                </button>
            </div>
        </div>
    );
}
