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
    const [registrations, setRegistrations] = useState([]); // Cambiar a registros de asistencia
    const navigate = useNavigate();

    const handleLogoChange = (e) => {
        setLogo(e.target.files[0]);
    };

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const response = await fetch('http://localhost:3000/registrations/details'); // Endpoint para obtener detalles de registros
                const data = await response.json();
                if (response.ok) {
                    setRegistrations(data.data); // Suponiendo que 'data' contiene la lista de registros
                } else {
                    alert(data.error || 'Error al obtener registros');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchRegistrations();
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
        // Modificar para que coincida con los datos de 'registrations'
        const tableData = registrations.map(reg => [
            reg.registration_id, 
            reg.user_first_name, 
            reg.user_last_name, 
            reg.event_name, 
            reg.ticket_code, 
            reg.ticket_name, 
            reg.ticket_category, 
            reg.registration_date
        ]);
        autoTable(doc, {
            head: [['ID Registro', 'Nombre Usuario', 'Apellido Usuario', 'Evento', 'Código Boleto', 'Nombre Boleto', 'Categoría Boleto', 'Fecha de Registro']],
            body: tableData,
            startY: 60, // Ajusta la posición de inicio de la tabla
            styles: {
                overflow: 'linebreak',
                fontSize: 10,
                cellPadding: 3,
                halign: 'center',
                valign: 'middle',
            },
        });
        doc.save('informe_registros_asistencia.pdf'); // Cambia el nombre del archivo
    };

    return (
        <div className="create-report-form">
            <h1 className="custom-au-title">Crear Informe de Registros de Asistencia</h1>
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
