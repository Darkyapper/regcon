import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './CreateRegReport.css';
import image from '../../assets/document.png';

export default function CreateRegReport() {
    const [author, setAuthor] = useState('');
    const [logo, setLogo] = useState(null);
    const [printDate, setPrintDate] = useState('');
    const [attendances, setAttendances] = useState([]); // Cambiado a asistencia
    const navigate = useNavigate();

    const handleLogoChange = (e) => {
        setLogo(e.target.files[0]);
    };

    useEffect(() => {
        const fetchAttendances = async () => {
            const workgroupId = localStorage.getItem('workgroup_id'); // Obtén el workgroup_id

            if (!workgroupId) {
                console.error('No se encontró workgroup_id en el local storage');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/attendance-info?workgroup_id=${workgroupId}`); // Endpoint actualizado para obtener detalles de asistencia
                const data = await response.json();
                if (response.ok) {
                    setAttendances(data.data); // Asumiendo que 'data' contiene la lista de asistencias
                } else {
                    alert(data.error || 'Error al obtener asistencias');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchAttendances();
    }, []);

    const handleSaveAsPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Informe de Registros de Asistencia', 20, 20);
        doc.setFontSize(12);
        doc.text(`Autor: ${author}`, 20, 30);
        doc.text(`Fecha de Impresión: ${printDate}`, 20, 40);

        if (logo) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgData = reader.result;
                const imgWidth = 25; // Ancho del logo en el PDF
                const imgHeight = 25; // Altura del logo en el PDF
                const xPosition = doc.internal.pageSize.width - imgWidth - 10; // Ajusta la posición a la derecha
                doc.addImage(imgData, 'PNG', xPosition, 10, imgWidth, imgHeight); // Añadir el logo
                addTableToPDF(doc);
            };
            reader.readAsDataURL(logo);
        } else {
            addTableToPDF(doc);
        }
    };

    const addTableToPDF = (doc) => {
        // Modificar para que coincida con los datos de 'attendances'
        const tableData = attendances.map(attendance => [
            attendance.attendance_id, 
            attendance.user_first_name, 
            attendance.user_last_name, 
            attendance.event_name, 
            attendance.ticket_code, 
            attendance.ticket_name, 
            attendance.status, 
            attendance.registration_date
        ]);
        autoTable(doc, {
            head: [['ID Asistencia', 'Nombre Usuario', 'Apellido Usuario', 'Evento', 'Código Boleto', 'Boleto', 'Estado de Asistencia', 'Fecha de Registro']],
            body: tableData,
            startY: 60, // Ajusta la posición de inicio de la tabla
            styles: {
                overflow: 'linebreak',
                fontSize: 8,
                cellPadding: 3,
                halign: 'center',
                valign: 'middle',
            },
        });
        doc.save('informe_registros_asistencia.pdf'); // Cambia el nombre del archivo
    };

    return (
        <div className="create-report-form">
            <h1 className="custom-au-title">Crear Informe de Asistencias</h1>
            <div className='custom-div-cs'>
                <div>
                    <img src={image} alt="documento" className="image-example"/>
                </div>
                <form className="form-report">
                    <div className="input-group">
                        <label>Autor del Informe</label>
                        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Logo</label>
                        <small>Se recomienda formato PNG y relación de aspecto 1:1</small>
                        <input type="file" onChange={handleLogoChange} required />
                    </div>
                    <div className="input-group">
                        <label>Fecha de Creación</label>
                        <input type="date" value={printDate} onChange={(e) => setPrintDate(e.target.value)} required />
                        <small className='text-orange-600'>*No es necesario que se llenen todos los campos para generar el informe</small>
                    </div>
                    <button type="button" className="button-imprimir" onClick={handleSaveAsPDF}>Guardar PDF</button>
                </form>
            </div>
        </div>
    );
}
