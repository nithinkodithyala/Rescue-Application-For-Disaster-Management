// import React, { useState } from 'react';
// // You might need to import additional libraries for QR code scanning
// const Donate = () => {
//     const [upiId, setUpiId] = useState('');

//     const handleUPIChange = (event) => {
//         setUpiId(event.target.value);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Here you can add the logic to handle the donation
//         console.log('Donation initiated with UPI ID:', upiId);
//     };

//     // Placeholder for QR code scanner
//     const handleQRCodeScan = (data) => {
//         if (data) {
//             // Logic to handle QR code data
//             console.log('QR Code Scanned:', data);
//         }
//     };

//     return (
//         <div>
//             <h1>Donate to Relief Centers via scaning the QR code </h1>
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//                 {/* <h2>Scan QR Code</h2> */}
//                 <img src="./scanner.jpg" alt="UPI Scanner" className="scanner-image" />

//                     <p>Contact The Home Affairs India For further Donations</p>
//                     <p>Phone: 011 26701728/730 </p>
//                     <p>Fax: 011 26701727 </p>
//                     <p>Helpline: 011 1078.</p>
//              </div>
//         </div>
//     );
// };

// export default Donate;
import React, { useState } from 'react';
import './Donate.css'; // Import the CSS file

const Donate = () => {
    const [upiId, setUpiId] = useState('');

    const handleUPIChange = (event) => {
        setUpiId(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can add the logic to handle the donation
        console.log('Donation initiated with UPI ID:', upiId);
    };

    // Placeholder for QR code scanner
    const handleQRCodeScan = (data) => {
        if (data) {
            // Logic to handle QR code data
            console.log('QR Code Scanned:', data);
        }
    };

    return (
        <div>
            <h1>Donate to Relief Centers via scanning the QR code</h1>
            <div className="contact-section">
            <img src="./scanner.jpg" alt="UPI Scanner" className="scanner-image" />
                <h2 className="contact-heading">Contact Home of Affairs for further Details:</h2>
                <p className="contact-info">Phone: 011 26701728/730</p>
                <p className="contact-info">Fax: 011 26701727</p>
                <p className="contact-info">Helpline: 011 1078</p>
             </div>
        </div>
    );
};

export default Donate;

