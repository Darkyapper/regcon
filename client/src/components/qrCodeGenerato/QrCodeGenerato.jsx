import React from 'react';
import { FaFileDownload } from "react-icons/fa";

const QrCodeGenerator = ({ code }) => {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${code}&size=200x200`;

    const handleDownload = () => {
        // Create an anchor element
        const link = document.createElement('a');
        link.href = qrCodeUrl; // Set the URL for the image
        link.download = `QRCode-${code}.png`; // Set the name for the downloaded file
        document.body.appendChild(link); // Append the link to the body
        link.click(); // Simulate a click on the link to trigger the download
        document.body.removeChild(link); // Remove the link from the DOM
    };

    return (
        <div>
            <img src={qrCodeUrl} alt={`QR Code for ${code}`} />
            <button className="download-button" onClick={handleDownload}>
            <FaFileDownload />
            </button>
        </div>
    );
};

export default QrCodeGenerator;
