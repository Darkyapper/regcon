import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './EventStatistics.css';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const EventStatistics = () => {
    const [eventData, setEventData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEventStatistics = async () => {
            const workgroupId = localStorage.getItem('workgroup_id');
            try {
                const response = await fetch(`http://localhost:3000/eventattendancesummary?workgroup_id=${workgroupId}`);
                const data = await response.json();
                if (response.ok) {
                    setEventData(data.data);
                } else {
                    setError(data.message || 'Error al obtener estadísticas de eventos');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Error al obtener estadísticas de eventos');
            }
        };
        fetchEventStatistics();
    }, []);

    const chartData = {
        labels: eventData.map(event => event.event_name),
        datasets: [
            {
                label: 'Total Registrados',
                data: eventData.map(event => event.total_registered),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Total Asistidos',
                data: eventData.map(event => event.total_attended),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
            {
                label: 'Total No Asistidos',
                data: eventData.map(event => event.total_not_attended),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="custom-estats p-4 bg-white rounded-lg shadow-md">
            <h2 className="title-uts text-2xl font-bold mb-4">Estadísticas de Eventos</h2>
            {error && <p className="text-red-500">{error}</p>}
            {eventData.length > 0 ? (
                <div style={{ position: 'relative', height: '300px' }}>
                    <Bar 
                        data={chartData} 
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 5,
                                    }
                                }
                            }
                        }} 
                    />
                </div>
            ) : (
                <p>Cargando estadísticas de eventos...</p>
            )}
        </div>
    );
};

export default EventStatistics;
