import React from 'react';
import './RecommendedActions.css';

export default function RecommendedActions() {
    return (
        <div className="recommended-actions p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg mb-4">Acciones Recomendadas</h2>
            <div className="grid grid-cols-2 gap-4">
                <button className="action-button">
                    Crear boletos nuevos
                </button>
                <button className="action-button">
                    Conozca a su equipo
                </button>
                <button className="action-button">
                    Crear e imprimir informes
                </button>
                <button className="action-button">
                    ¡Conozca y aprenda a usar RegCon!
                </button>
            </div>
        </div>
    );
}