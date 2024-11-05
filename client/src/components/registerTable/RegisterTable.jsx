import React, { useEffect, useState } from 'react';
import './RegisterTable.css';
import { FaRegTrashAlt } from "react-icons/fa";
import ConfirmDeleteModalU from '../confirmDeleteModalU/ConfirmDeleteModalU';
import { useNavigate } from 'react-router-dom';

export default function RegisterTable() {
    const navigate = useNavigate();
    const [attendances, setAttendances] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [attendancesPerPage] = useState(15);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [attendanceToDelete, setAttendanceToDelete] = useState(null);

    useEffect(() => {
        const fetchAttendances = async () => {
            const workgroupId = localStorage.getItem('workgroup_id'); // Obtén el workgroup_id

            if (!workgroupId) {
                console.error('No se encontró workgroup_id en el local storage');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/attendance-info?workgroup_id=${workgroupId}`); // Endpoint actualizado
                const data = await response.json();
                if (response.ok) {
                    setAttendances(data.data); // Suponiendo que 'data' contiene la lista de registros
                } else {
                    console.error('Error fetching attendances:', data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchAttendances();
    }, []);

    const handleDeleteClick = (id) => {
        setAttendanceToDelete(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/attendance/${attendanceToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Registro eliminado exitosamente');
                setAttendances(attendances.filter(attendance => attendance.attendance_id !== attendanceToDelete)); // Cambiado a attendance
            } else {
                alert('Error al eliminar el registro');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setIsModalOpen(false);
    };

    // Paginación
    const indexOfLastAttendance = currentPage * attendancesPerPage;
    const indexOfFirstAttendance = indexOfLastAttendance - attendancesPerPage;
    const currentAttendances = attendances.slice(indexOfFirstAttendance, indexOfLastAttendance);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="custom-cs p-4 bg-white rounded-lg shadow-md">
            <h2 className="title-uts">Administrar Asistencias</h2>
            <table className="tablas-chinas min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Apellido</th>
                        <th className="border px-4 py-2">Evento</th>
                        <th className="border px-4 py-2">Código del Boleto</th>
                        <th className="border px-4 py-2">Boleto</th>
                        <th className="border px-4 py-2">Estado de Asistencia</th>
                        <th className="border px-4 py-2">Fecha de Registro</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAttendances.map(attendance => (
                        <tr key={attendance.attendance_id}>
                            <td className="border px-4 py-2">{attendance.attendance_id}</td>
                            <td className="border px-4 py-2">{attendance.user_first_name}</td>
                            <td className="border px-4 py-2">{attendance.user_last_name}</td>
                            <td className="border px-4 py-2">{attendance.event_name}</td>
                            <td className="border px-4 py-2">{attendance.ticket_code}</td>
                            <td className="border px-4 py-2">{attendance.ticket_name}</td>
                            <td className="border px-4 py-2">{attendance.status}</td>
                            <td className="border px-4 py-2">{new Date(attendance.registration_date).toLocaleString()}</td>
                            <td className="border px-4 py-2">
                                <button className="button-cs mx-1 px-4 py-2 rounded bg-red-600 text-white hover:text-black" onClick={() => handleDeleteClick(attendance.attendance_id)}>
                                    <FaRegTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Paginación */}
            <div className="flex justify-center mt-4">
                {[...Array(Math.ceil(attendances.length / attendancesPerPage))].map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className={`button-cs mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-teal-400 text-white' : 'bg-gray-200'}`}>
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Modal de confirmación */}
            <ConfirmDeleteModalU 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={confirmDelete}
            />
        </div>
    );
}
