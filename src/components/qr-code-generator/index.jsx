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
      
        // create an url to access qr code svg
        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: "image/svg+xml" });
        const svgDataUrl = URL.createObjectURL(blob);
      
        // create png image and give it the appropriate source and dimensions
        const image = new Image();
        image.src = svgDataUrl;
      
        image.addEventListener('load', () => {

          const canvas = document.createElement('canvas');
          canvas.setAttribute('width', 300);
          canvas.setAttribute('height', 300);
      
          const context = canvas.getContext('2d');
          context.drawImage(image, 0, 0, 300, 300);
   
          const uri = canvas.toDataURL('image/png').replace('image/png', 'octet/stream');

          setPng(uri);
          setQrCodeValue("");

          URL.revokeObjectURL(uri);
        });

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
                    <a 
                    className={qrCodeValue && qrCodeValue.length > 0 ? "qrcode__btnActive" : null}
                    href={qrCodeValue && qrCodeValue.length > 0 ? png : null}
                    download={'qrcode.png'}
                    onClick={() => handleSvgToPng(svg?.current)}>
                        Download
                    </a>
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