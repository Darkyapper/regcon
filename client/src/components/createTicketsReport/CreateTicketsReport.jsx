import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './CreateTicketsReport.css';
import image from '../../assets/document.png';

export default function CreateTicketsReport() {
    const [author, setAuthor] = useState('');
    const [logo, setLogo] = useState(null);
    const [printDate, setPrintDate] = useState('');
    const [tickets, setTickets] = useState([]); // Cambiar a tickets en lugar de users
    const navigate = useNavigate();

    const handleLogoChange = (e) => {
        setLogo(e.target.files[0]);
    };

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch('http://localhost:3000/ticket-view'); // Asegúrate de que la URL sea correcta
                const data = await response.json();
                if (response.ok) {
                    setTickets(data.data); // Actualizar para obtener la información de los boletos
                } else {
                    alert(data.error || 'Error al obtener los boletos');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchTickets();
    }, []);

    const handleSaveAsPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Informe de Boletos', 20, 20);
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
        const tableData = tickets.map(ticket => [
            ticket.code,
            ticket.ticket_name,
            ticket.category_name,
            ticket.category_price,
            ticket.category_description,
            ticket.status
        ]);
        autoTable(doc, {
            head: [['Código', 'Nombre', 'Categoría', 'Costo', 'Descripción', 'Estado']],
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
        doc.save('informe_boletos.pdf'); // Cambiar el nombre del archivo a 'informe_boletos.pdf'
    };

    return (
        <div className="create-report-form">
            <h1 className="custom-au-title">Crear Informe de Boletos</h1>
            <div className='custom-div-cs'>
                <div>
                    <img src={image} alt="documento" className="image-example" />
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
