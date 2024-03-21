import { useRef, useState } from "react";
import QRCode from "react-qr-code";
import './style.css';

export default function QrCodeGenerator() {

    const [qrCodeValue, setQrCodeValue] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [png, setPng] = useState("");
    const svg = useRef(null);

    function handleGenerateQrCode() {
        setQrCodeValue(inputValue);
        setInputValue("");
    }

    function handleSvgToPng(svg) {

        // create a canvas element and give it a size
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;

        // SVG to XML format, create blob and URL
        const data = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([data], { type: 'image/svg+xml' });
        const win = window.URL;
        const url = win.createObjectURL(blob);
        const img = new Image();
        img.src = url;

        // get the png ready for download
        img.addEventListener('load', () => {
            canvas.getContext('2d').drawImage(img, 0, 0);
            win.revokeObjectURL(url);
            const uri = canvas.toDataURL('image/png').replace('image/png', 'octet/stream');
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            a.href = uri;
            a.download = 'qrcode.png';
            a.click();
            window.URL.revokeObjectURL(uri);
            document.body.removeChild(a);
        });

        // reset the qr code value
        setQrCodeValue("");

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
                <div className="qrcode__btnWrapper">
                    <button
                    className={inputValue && inputValue.length > 0 ? "qrcode__btnActive" : null}
                    onClick={handleGenerateQrCode}
                    disabled={inputValue && inputValue.trim() !== '' ? false : true}>
                        Generate
                    </button>
                    <button 
                    className={qrCodeValue && qrCodeValue.length > 0 ? "qrcode__btnActive" : null}
                    onClick={() => handleSvgToPng(svg?.current)}
                    disabled={qrCodeValue !== '' ? false : true}>
                        Download PNG
                    </button>
                </div>
            </div>
            <div className="qrcode__result">
                <QRCode 
                title="qrcode"
                value={qrCodeValue}
                bgColor="#fff"
                ref={svg}
                />
            </div>
        </div>
    );
}