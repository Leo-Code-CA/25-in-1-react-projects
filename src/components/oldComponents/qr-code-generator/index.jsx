import { useState } from "react";
import QRCode from "react-qr-code";
import './style.css';

export default function QrCodeGenerator() {

    const [qrCode, setQrCode] = useState("");
    const [input, setInput] = useState("");

    function handleGenerateQrCode() {
        setQrCode(input);
        setInput("");
    }

    return (
        <div className="qr-code-container">
            <h2>QR Code Generator</h2>
            <div>
                <input
                onChange={(e) => setInput(e.target.value)}
                type="text" 
                name="qr-code" 
                placeholder="Enter your value here"
                value={input}/>
                <button
                onClick={handleGenerateQrCode}
                disabled={input && input.trim() !== '' ? false : true}>
                    Generate
                </button>
            </div>
            <div>
                <QRCode 
                id="qr-code-value"
                value={qrCode}
                size="400"
                bgColor="white"
                />
            </div>
        </div>
    );
}