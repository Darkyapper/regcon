import React from 'react';
import './DownloadApp.css';
import image from '../../assets/regcon-src.png';

export default function DownloadApp() {
    return (
        <div className="custom-content-ess">
            <h1>Esta función aún no está disponible en la versión web.</h1>
            <p>Descarga la aplicación para acceder a funciones off-line, bases de datos local, conexión a validadores e imporesoras, ¡Y mucho más!</p>
            <img src={image} alt="Download App" />
            <button className="download-button" title="La aplicación aún sigue en desarrollo. Puede revisar nuestro blog para conocer los avances. Recibirás una notificación y un correo cuando la aplicación este disponible.">Descargar Ahora</button>
            <span className="block text-sm sm:text-center mt-6">
                © 2024 RegCon™. All Rights Reserved.
            </span>
        </div>
    );
}
