import { useState } from "react";
import QRCode from "react-qr-code";
import './style.css';

export default function QrCodeGenerator() {

    const [qrCodeValue, setQrCodeValue] = useState("");
    const [inputValue, setInputValue] = useState("");

    function handleGenerateQrCode() {
        setQrCodeValue(inputValue);
        setInputValue("");
    }

    return (
        <div className="qrcode">
            <h2>QR Code Generator</h2>
            <div className="qrcode__input">
                <label htmlFor="qrcode-input">Enter your message below:</label>
                <input
                id="qrcode-input"
                onChange={(e) => setInputValue(e.target.value)}
                type="text" 
                name="qrcode-input" 
                placeholder="Enter your message here"
                value={inputValue}/>
                <button
                onClick={handleGenerateQrCode}
                disabled={inputValue && inputValue.trim() !== '' ? false : true}>
                    Generate
                </button>
            </div>
            <div className="qrcode__result">
                <QRCode 
                title="qrcode"
                value={qrCodeValue}
                bgColor="#fff"
                />
            </div>
            <a href="#" download='/test.png'>Download</a>
        </div>
    );
}

// check that: https://gist.github.com/tatsuyasusukida/1261585e3422da5645a1cbb9cf8813d6